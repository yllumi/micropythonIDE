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


function log(msg) {
	$('.terminal').append('<p>'+ msg +'</p>');
	var div = $('.terminal');
	div.scrollTop( div.get(0).scrollHeight );
	if(div.children().length > 50)
		div.children().first().remove();
}


var connection = new SerialConnection();

connection.onConnect.addListener(function() {
	log('connected...');
	// remove the connection drop-down
	document.querySelector('#connect_box').style.display = 'none';
	document.querySelector('#control_box').style.display = 'block';
	// Simply send text to Espruino
	connection.send('"Hello "+"Espruino"\n');
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
});

/* BLOCKLY */
// Blockly.inject(document.getElementById('blocklyDiv'),
// 			{toolbox: document.getElementById('toolbox')} );
