var terminal;
var dontLog = false;
var mode;

function log(msg) {
	terminal.echo(msg);
	terminal.set_command("");

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

function changeMode(mode){
	if(mode == 'block'){
		$('#blocklyDiv').css('z-index', 1);
		$('#code-editor').css('z-index', -1);
	} else {
		$('#blocklyDiv').css('z-index', -1);
		$('#code-editor').css('z-index', 1);
	}
}

// load data from file if it is already connected
loadInitialFile(launchData);

////////////////////////////////////////////////////////
/////////////// MAKE SERIAL CONNECTION /////////////////

var connection = new SerialConnection();

// when app connected to serial
connection.onConnect.addListener(function() {
	log('connected...');
	connection.send('\x03');
	terminal.set_prompt(">>> ");
});

// when app receive data from serial
connection.onReadLine.addListener(function(line) {
	if(!dontLog)
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
$(document).off('click', '.serialport').on('click', '.serialport', function() {	
	// get the device to connect to
	var devicePath = $(this).data('path');
	// connect
	log("Connecting to "+devicePath);
	connection.connect(devicePath);

	$(runProgram).removeAttr('disabled');

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
			connection.send(command + "\r\n");
		} else {
			term.echo('');
		}
	}, {
		greetings: 'Welcome to Micropython Web IDE',
		name: 'upython_terminal',
		height: 70 + "%",
		exit: false,
		prompt: ''
	});

	// when CHOOSE FILE BUTTON clicked
	$(document).off('click', chooseFileButton).on('click', chooseFileButton, function(e) {
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
	$(document).off('click', saveFileButton).on('click', saveFileButton, function(e) {
		terminal.echo("File saved.");
		var blob = new Blob([editor.getValue()], {type: 'text/plain'});
		writeFileEntry(chosenEntry, blob, function(e) {
			successMsg('File saved.');
			codeChanges(false);
		});
	});

	// CLOSE BUTTON
	$(document).off('click', '.btn-close').on('click', '.btn-close', function(){
		window.close();
	});

	// when STOP BUTTON clicked
	$(document).off('click', '.btn-stop').on('click', '.btn-stop', function(){
		connection.send('\x03');
		terminalal.set_prompt(">>> ");
		$('.btn-stop').addClass('btn-run').removeClass('btn-stop')
		.attr('title', 'Stop program').html('<span class="flaticon-run"></span>');
	});

	// when RUN BUTTON clicked
	$(document).off('click', '.btn-run').on('click', '.btn-run', function(){
		dontLog = false;
		connection.send('\x04');
		terminal.set_prompt("");

		console.log('run');

		$('.btn-run').addClass('btn-stop').removeClass('btn-run')
		.attr('title', 'Stop program').html('<span class="flaticon-stop"></span>');
	});

	// when one of output panel button clicked
	$(document).off('click', '.btn-repl').on('click', '.btn-repl', function(){
		$('.btn-output').addClass('btn-default').removeClass('btn-info');
		$('.output-panel').children('.output-panel-child').hide();

		$(this).addClass('btn-info').removeClass('btn-default');
		$('.terminal').show();
	});
	$(document).off('click', '.btn-bar').on('click', '.btn-bar', function(){
		$('.btn-output').addClass('btn-default').removeClass('btn-info');
		$('.output-panel').children('.output-panel-child').hide();

		$(this).addClass('btn-info').removeClass('btn-default');
		$('.bar').show();
	});

	// when PYTHON CODE BUTTON clicked
	$(document).off('click', '.btn-codemode').on('click', '.btn-codemode', function(){
		changeMode('block');

		$(this).addClass('btn-blockmode').removeClass('btn-codemode')
		.attr('title', 'switch to python mode').html('<span class="flaticon-blockly"></span>');
	});

	// when BLOCKLY CODE BUTTON clicked
	$(document).off('click', '.btn-blockmode').on('click', '.btn-blockmode', function(){
		changeMode('code');

		$(this).addClass('btn-codemode').removeClass('btn-blockmode')
		.attr('title', 'switch to blockly mode').html('<span class="flaticon-python3"></span>');
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
// window.onload = function() {
	Blockly.inject(document.getElementById('blocklyDiv'),
    	  {toolbox: document.getElementById('toolbox')});

	$('#blocklyDiv').css('z-index', -1);
// };
