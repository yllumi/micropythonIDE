/* SERIAL*/

const serial = chrome.serial;

/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function(buf) {
	var bufView = new Uint8Array(buf);
	var encodedString = String.fromCharCode.apply(null, bufView);
	return decodeURIComponent(escape(encodedString));
};

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function(str) {
	var encodedString = unescape(encodeURIComponent(str));
	var bytes = new Uint8Array(encodedString.length);
	for (var i = 0; i < encodedString.length; ++i) {
		bytes[i] = encodedString.charCodeAt(i);
	}
	return bytes.buffer;
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var SerialConnection = function() {
	this.connectionId = -1;
	this.lineBuffer = "";
	this.boundOnReceive = this.onReceive.bind(this);
	this.boundOnReceiveError = this.onReceiveError.bind(this);
	this.onConnect = new chrome.Event();
	this.onReadLine = new chrome.Event();
	this.onError = new chrome.Event();
};

SerialConnection.prototype.onConnectComplete = function(connectionInfo) {
	if (!connectionInfo) {
		log("Connection failed.");
		
		$('.btn-disconnect').addClass('btn-connect').removeClass('btn-disconnect')
		.attr('title', 'Click and choose serial path to connect').html('<span class="flaticon-disconnected"></span>');

		return;
	}
	this.connectionId = connectionInfo.connectionId;
	serial.onReceive.addListener(this.boundOnReceive);
	serial.onReceiveError.addListener(this.boundOnReceiveError);
	this.onConnect.dispatch();
};

SerialConnection.prototype.onReceive = function(receiveInfo) {
	if (receiveInfo.connectionId !== this.connectionId) {
		return;
	}

	this.lineBuffer += ab2str(receiveInfo.data);

	var index;
	while ((index = this.lineBuffer.indexOf('\n')) >= 0) {
		var line = this.lineBuffer.substr(0, index + 1);
		this.onReadLine.dispatch(line);
		this.lineBuffer = this.lineBuffer.substr(index + 1);
	}
};

SerialConnection.prototype.onReceiveError = function(errorInfo) {
	if (errorInfo.connectionId === this.connectionId) {
		this.onError.dispatch(errorInfo.error);
	}
};

SerialConnection.prototype.getDevices = function(callback) {
	serial.getDevices(callback)
};

SerialConnection.prototype.connect = function(path) {
	serial.connect(path, this.onConnectComplete.bind(this))
};

SerialConnection.prototype.send = function(msg) {
	if (this.connectionId < 0) {
		throw 'Invalid connection';
	}
	serial.send(this.connectionId, str2ab(msg), function() {});
};

SerialConnection.prototype.disconnect = function() {
	if (this.connectionId < 0) {
		throw 'Invalid connection';
	}
	
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//// READ AND WRITE TO FILE ////////////////////////////


var chosenEntry = null;
var chooseFileButton = '.btn-flash';
var saveFileButton = '.btn-save';
var output = document.querySelector('output');
var textarea = '#thecode';

function errorHandler(e) {
  console.error(e);
}

function readAsText(fileEntry, callback) {
  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onerror = errorHandler;
    reader.onload = function(e) {
      callback(e.target.result);
    };

    reader.readAsText(file);
  });
}

function writeFileEntry(writableEntry, opt_blob, callback) {
  if (!writableEntry) {
    output.textContent = 'Nothing selected.';
    return;
  }

  writableEntry.createWriter(function(writer) {

    writer.onerror = errorHandler;
    writer.onwriteend = callback;

    // If we have data, write it to the file. Otherwise, just use the file we
    // loaded.
    if (opt_blob) {
      writer.truncate(opt_blob.size);
      waitForIO(writer, function() {
        writer.seek(0);
        writer.write(opt_blob);
      });
    } 
    else {
      chosenEntry.file(function(file) {
        writer.truncate(file.fileSize);
        waitForIO(writer, function() {
          writer.seek(0);
          writer.write(file);
        });
      });
    }
  }, errorHandler);
}

function waitForIO(writer, callback) {
  // set a watchdog to avoid eventual locking:
  var start = Date.now();
  // wait for a few seconds
  var reentrant = function() {
    if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
      setTimeout(reentrant, 100);
      return;
    }
    if (writer.readyState===writer.WRITING) {
      console.error("Write operation taking too long, aborting!"+
        " (current writer readyState is "+writer.readyState+")");
      writer.abort();
    } 
    else {
      callback();
    }
  };
  setTimeout(reentrant, 100);
}

// for files, read the text content into the textarea
function loadFileEntry(_chosenEntry) {
  chosenEntry = _chosenEntry;

  chosenEntry.file(function(file) {
    readAsText(chosenEntry, function(result) {
      $(textarea).val(result);
    });
    // Update display.
    saveFileButton.disabled = false; // allow the user to save the content
  });
}

function loadInitialFile(launchData) {
  if (launchData && launchData.items && launchData.items[0]) {
    loadFileEntry(launchData.items[0].entry);
  } 
  else {
    // see if the app retained access to an earlier file or directory
    chrome.storage.local.get('chosenFile', function(items) {
      console.log(items);
      if (items.chosenFile) {
        // if an entry was retained earlier, see if it can be restored
        chrome.fileSystem.isRestorable(items.chosenFile, function(bIsRestorable) {
          // the entry is still there, load the content
          console.info("Restoring " + items.chosenFile);
          chrome.fileSystem.restoreEntry(items.chosenFile, function(chosenEntry) {
            if (chosenEntry) {
              chosenEntry.isFile ? loadFileEntry(chosenEntry) : loadDirEntry(chosenEntry);
            }
          });
        });
      }
    });
  }
}

$(document).on('click', chooseFileButton, function(e) {
  var accepts = [{
    mimeTypes: ['text/*'],
    extensions: ['py']
  }];
  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(theEntry) {
    if (!theEntry) {
      output.textContent = 'No file selected.';
      return;
    }
    // use local storage to retain access to this file
    chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
    loadFileEntry(theEntry);
  });
});

$(document).on('click', saveFileButton, function(e) {
  // var config = {type: 'saveFile', suggestedName: chosenEntry.name};
  // chrome.fileSystem.chooseEntry(config, function(writableEntry) {
    var blob = new Blob([$(textarea).val()], {type: 'text/plain'});
    writeFileEntry(chosenEntry, blob, function(e) {
      output.textContent = 'Write complete :)';
    });
  // });
});

loadInitialFile(launchData);


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function log(msg) {
	$('.terminal').append('<p>'+ msg +'</p>');
	var div = $('.terminal');
	div.scrollTop( div.get(0).scrollHeight );
	if(div.children().length > 50)
		div.children().first().remove();

	var widthbar = parseInt(msg)/4095 * 100;
	$('#progress1').children('.progress-bar').attr('aria-valuenow', parseInt(msg)).attr('aria-valuemin', 0).attr('aria-valuemax', 4095).css('width', widthbar+'%');
	$('#progress1').children('.progress-bar').children('.sr-only').html(parseInt(msg));
}


var connection = new SerialConnection();

connection.onConnect.addListener(function() {
	log('connected...');
});

connection.onReadLine.addListener(function(line) {
	log(line);
	// if the line 'TEMPERATURE=' foo is returned, set the
	// set the button's text
	if (line.indexOf("TEMPERATURE=")==0)
		document.querySelector('#get_temperature').innerHTML = "Temp = "+line.substr(12);
});

// Populate the list of available devices
connection.getDevices(function(ports) {
	// get drop-down port selector
	var dropDown = $('.dropdown-menu');
	// clear existing options
	dropDown.html("");
	// add new options
	ports.forEach(function (port) {
		var displayName = port["displayName"] + "("+port.path+")";
		if (!displayName) displayName = port.path;
		dropDown.append('<li role="presentation"><a role="menuitem" class="serialport" tabindex="-1" data-path="'+port.path+'">'+displayName+'</a></li>');
	});
});

// Handle the 'Connect' button
$(document).on('click', '.serialport', function() {	
	// get the device to connect to
	var devicePath = $(this).data('path');
	// connect
	log("Connecting to "+devicePath);
	connection.connect(devicePath);

	$('.btn-run').addClass('btn-stop').removeClass('btn-run')
	.attr('title', 'Stop program').html('<span class="flaticon-stop"></span>');

	$('.btn-connect').addClass('btn-disconnect').removeClass('btn-connect')
	.attr('title', 'Connected to port '+devicePath).html('<span class="flaticon-connected"></span>');

});

////////////////////////////////////////////////////////

// Toggle LED state
// var is_on = false;
// document.querySelector('#toggle').addEventListener('click', function() {
// 	is_on = !is_on;
// 	connection.send("pyb.USB_VCP.setinterrupt(3)\n");
// });

$(function(){
	$(document).on('click', '.btn-close', function(){
		window.close();
	});

	// when button stop clicked
	$(document).on('click', '.btn-stop', function(){
		connection.send('\x03');
		connection.send('\x03');
		connection.send('\x03');

		$('.btn-stop').addClass('btn-run').removeClass('btn-stop')
		.attr('title', 'Stop program').html('<span class="flaticon-run"></span>');
	});

	// when button run clicked
	$(document).on('click', '.btn-run', function(){
		connection.send('\x04');

		$('.btn-run').addClass('btn-stop').removeClass('btn-run')
		.attr('title', 'Stop program').html('<span class="flaticon-stop"></span>');
	});

	// when one of output panel button clicked
	$(document).on('click', '.btn-repl', function(){
		$('.btn-output').addClass('btn-default').removeClass('btn-info');
		$('.output-panel').children('.output-panel-child').hide();

		$(this).addClass('btn-info').removeClass('btn-default');
		$('.terminal').show();
	});
	$(document).on('click', '.btn-bar', function(){
		$('.btn-output').addClass('btn-default').removeClass('btn-info');
		$('.output-panel').children('.output-panel-child').hide();

		$(this).addClass('btn-info').removeClass('btn-default');
		$('.bar').show();
	});

});

/* BLOCKLY */
// Blockly.inject(document.getElementById('blocklyDiv'),
// 			{toolbox: document.getElementById('toolbox')} );
