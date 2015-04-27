var terminal;

function log(msg) {
	terminal.echo(msg);
	terminal.set_command("");

	// var div = $('.terminal');
	// div.scrollTop( div.get(0).scrollHeight );
	// if(div.children().length > 50)
	// 	div.children().first().remove();

	var widthbar = parseInt(msg)/4095 * 100;
	$('#progress1').children('.progress-bar').attr('aria-valuenow', parseInt(msg)).attr('aria-valuemin', 0).attr('aria-valuemax', 4095).css('width', widthbar+'%');
	$('#progress1').children('.progress-bar').children('.sr-only').html(parseInt(msg));
}

function successMsg(msg){
	$('.successMsg').html(msg).show();

	setInterval(function(){
		$('.successMsg').fadeOut(1000);
	}, 5000);
}
function errorMsg(msg){
	$('.errorMsg').html(msg).show();

	setInterval(function(){
		$('.errorMsg').fadeOut(1000);
	}, 5000);
}

// load data from file if it is already connected
loadInitialFile(launchData);

////////////////////////////////////////////////////////
/////////////// MAKE SERIAL CONNECTION /////////////////

var connection = new SerialConnection();

// when app connected to serial
connection.onConnect.addListener(function() {
	log('connected...');
});

// when app receive data from serial
connection.onReadLine.addListener(function(line) {
	log(line);
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

	$(runProgram).addClass('btn-stop').removeClass('btn-run').removeAttr('disabled')
	.attr('title', 'Stop program').html('<span class="flaticon-stop"></span>');

	$('.btn-connect').addClass('btn-disconnect').removeClass('btn-connect')
	.attr('title', 'Connected to port '+devicePath).html('<span class="flaticon-connected"></span>');

});

////////////////////////////////////////////////////////
////////////////////// LISTENERS ///////////////////////
////////////////////////////////////////////////////////

$(function(){
	// JCUBIC JQUERY TERMINAL
	terminal = $('.terminal').terminal(
	function(command, term) {
		if (command !== '') {
			connection.send(command + '\r');
		} else {
			term.echo('');
		}
	}, {
		greetings: 'Micropython Web IDE',
		name: 'upython_terminal',
		height: 70 + "%",
		exit: false,
		prompt: '>>> '
	});

	// when CHOOSE FILE BUTTON clicked
	$(document).on('click', chooseFileButton, function(e) {
	  var accepts = [{
		mimeTypes: ['text/*'],
		extensions: ['py']
	  }];
	  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(theEntry) {
		if (!theEntry) {
		  errorMsg('No file selected.');
		  return;
		}
		// use local storage to retain access to this file
		chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
		loadFileEntry(theEntry);
	  });
	});

	// when SAVE FILE BUTTON clicked
	$(document).on('click', saveFileButton, function(e) {
		termin.echo("File saved.");
		var blob = new Blob([editor.getValue()], {type: 'text/plain'});
		writeFileEntry(chosenEntry, blob, function(e) {
			successMsg('File saved.');
			codeChanges(false);
		});
	});

	// CLOSE BUTTON
	$(document).on('click', '.btn-close', function(){
		window.close();
	});

	// when STOP BUTTON clicked
	$(document).on('click', '.btn-stop', function(){
		connection.send('\x03');
		terminal.set_prompt(">>> ");

		$('.btn-stop').addClass('btn-run').removeClass('btn-stop')
		.attr('title', 'Stop program').html('<span class="flaticon-run"></span>');
	});

	// when RUN BUTTON clicked
	$(document).on('click', '.btn-run', function(){
		connection.send('\x04');
		terminal.set_prompt("");

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

//////////////////////////////////////////////////////////////
///////////////////////// CODEMIRROR /////////////////////////
//////////////////////////////////////////////////////////////
var editor = CodeMirror.fromTextArea(document.getElementById('thecode'), {
	lineNumbers: true,
	styleActiveLine: true,
	matchBrackets: true,
	lineWrapping: true,
	showTrailingSpace: true,
	mode: "python",
	theme: "3024-day"
});

editor.on("change", function(cm, changeObj) {
	codeChanges(true);
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
