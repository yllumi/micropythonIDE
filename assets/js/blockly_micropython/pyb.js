// Delay
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#bg4uoe
Blockly.Blocks['pyb_delay'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(Blockly.Blocks.texts.HUE);
		this.appendDummyInput()
				.appendField("Jeda")
				.appendField(new Blockly.FieldTextInput("1000"), "delay_value")
				.appendField(new Blockly.FieldDropdown([["milidetik", "ms"], ["mikrodetik", "us"]]), "delay_unit");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Delay for the given number of milliseconds or microseconds.');
	}
};

Blockly.Python['pyb_delay'] = function(block) {
	var text_delay_value = block.getFieldValue('delay_value');
	var dropdown_delay_unit = block.getFieldValue('delay_unit');
	// TODO: Assemble Python into code variable.
	var code = '';
	if(dropdown_delay_unit == 'ms')
		code = 'pyb.delay('+ text_delay_value +')\n';
	else
		code = 'pyb.udelay('+ text_delay_value +')\n';

	return code;
};

// millis() & micros()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#nwez2o
Blockly.Blocks['pyb_millis'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("millis");
		this.setOutput(true);
		this.setTooltip('Returns the number of milliseconds since the board was last reset.');
	}
};

Blockly.Python['pyb_millis'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.millis()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['pyb_micros'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("micros");
		this.setOutput(true);
		this.setTooltip('Returns the number of microseconds since the board was last reset.');
	}
};

Blockly.Python['pyb_micros'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.micros()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// elapsed_millis() and elapsed_micros()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zmvxgj
Blockly.Blocks['pyb_elapsed_millis'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendValueInput("since_elapse")
				.setCheck("Number")
				.appendField("elapsed milliseconds, since");
		this.setOutput(true);
		this.setTooltip('');
	}
};

Blockly.Python['pyb_elapsed_millis'] = function(block) {
	var value_since_elapse = Blockly.Python.valueToCode(block, 'since_elapse', Blockly.Python.ORDER_ATOMIC);
	// TODO: Assemble Python into code variable.
	var code = 'pyb.elapsed_millis(' + value_since_elapse + ')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['pyb_elapsed_micros'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendValueInput("since_elapse")
				.setCheck("Number")
				.appendField("elapsed microseconds, since");
		this.setOutput(true);
		this.setTooltip('');
	}
};

Blockly.Python['pyb_elapsed_micros'] = function(block) {
	var value_since_elapse = Blockly.Python.valueToCode(block, 'since_elapse', Blockly.Python.ORDER_ATOMIC);
	// TODO: Assemble Python into code variable.
	var code = 'pyb.elapsed_micros(' + value_since_elapse + ')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// hard_reset() & bootloader()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#sp7ik2
Blockly.Blocks['pyb_hard_reset'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Hard Reset");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Resets the pyboard in a manner similar to pushing the external RESET button.');
	}
};
Blockly.Python['pyb_hard_reset'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.hard_reset()\n';
	return code;
};

Blockly.Blocks['pyb_bootloader'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Activate Bootloader");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Activate the bootloader without BOOT* pins.');
	}
};
Blockly.Python['pyb_bootloader'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.bootloader()\n';
	return code;
};


// wfi()
Blockly.Blocks['pyb_wfi'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Wait for interrupt");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Wait for an internal or external interrupt.');
	}
};
Blockly.Python['pyb_wfi'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.wfi()\n';
	return code;
};

// stop()
Blockly.Blocks['pyb_stop'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Stop pyboard");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Put the pyboard in a “sleeping” state.');
	}
};
Blockly.Python['pyb_stop'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.stop()\n';
	return code;
};

// standby()
Blockly.Blocks['pyb_standby'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Standby pyboard");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Put the pyboard in a “sleeping” state.');
	}
};
Blockly.Python['pyb_standby'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.standby()\n';
	return code;
};

// have_cdc()
Blockly.Blocks['pyb_have_cdc'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("is have CDC");
		this.setOutput(true);
		this.setTooltip('Return True if USB is connected as a serial device, False otherwise.');
	}
};

Blockly.Python['pyb_have_cdc'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.have_cdc()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// set HID
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#z7g3ok
Blockly.Blocks['pyb_hid'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Set HID,");
		this.appendValueInput("button")
				.appendField("button");
		this.appendValueInput("x")
				.appendField("x");
		this.appendValueInput("y")
				.appendField("y");
		this.appendValueInput("z")
				.appendField("z");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Takes a 4-tuple (or list) and sends it to the USB host (the PC) to signal a HID mouse-motion event.');
	}
};

Blockly.Python['pyb_hid'] = function(block) {
	var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
	var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
	var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
	var value_z = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC);
	// TODO: Assemble Python into code variable.
	var code = 'pyb.USB_HID().send((' +value_button+ ',' +value_x+ ',' +value_y+ ',' +value_z+ '))\n';
	return code;
};

// freq()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#y332hq
// Blockly.Blocks['pyb_freq'] = {
//   init: function() {
//     this.setHelpUrl('http://www.example.com/');
//     this.setColour(180);
//     this.appendDummyInput()
//         .appendField("Frequency");
//     this.appendValueInput("sysclk")
//         .appendField("sysclk");
//     this.appendValueInput("hclk")
//         .appendField("hclk");
//     this.appendValueInput("pclk1")
//         .appendField("pclk1");
//     this.appendValueInput("pclk2")
//         .appendField("pclk2");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip('Sets the frequency of the CPU. If given no arguments, returns a tuple of clock frequencies.');
//   }
// };
// Blockly.Python['pyb_freq'] = function(block) {
//   var value_sysclk = Blockly.Python.valueToCode(block, 'sysclk', Blockly.Python.ORDER_ATOMIC);
//   var value_hclk = Blockly.Python.valueToCode(block, 'hclk', Blockly.Python.ORDER_ATOMIC);
//   var value_pclk1 = Blockly.Python.valueToCode(block, 'pclk1', Blockly.Python.ORDER_ATOMIC);
//   var value_pclk2 = Blockly.Python.valueToCode(block, 'pclk2', Blockly.Python.ORDER_ATOMIC);
//   // TODO: Assemble Python into code variable.
//   var code = '';
//   if(value_sysclk != ''){
//   	code = 'pyb.freq(['+value_sysclk+'])\n';

// 	  if(value_hclk != ''){
// 	  	code = 'pyb.freq(['+value_sysclk+'])\n';
// 	  }
//   } 
//   && value_hclk == '' && value_pclk1 == '')
//   return code;
// };

// main()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qi8pf2
Blockly.Blocks['pyb_main'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Set main file")
				.appendField(new Blockly.FieldTextInput("main.py"), "filename");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Set the filename of the main script to run after boot.py is finished. It only makes sense to call this function from within boot.py.');
	}
};
Blockly.Python['pyb_main'] = function(block) {
	var text_filename = block.getFieldValue('filename');
	// TODO: Assemble Python into code variable.
	var code = 'pyb.main('+ text_filename +')\n';
	return code;
};

// repl_uart()
Blockly.Blocks['pyb_set_repl_uart'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Set REPL UART")
				.appendField(new Blockly.FieldVariable("uart"), "uart");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Set the UART object that the REPL is repeated on.');
	}
};

Blockly.Python['pyb_set_repl_uart'] = function(block) {
	var variable_uart = Blockly.Python.variableDB_.getName(block.getFieldValue('uart'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble Python into code variable.
	var code = 'pyb.repl_uart('+variable_uart+')\n';
	return code;
};

Blockly.Blocks['pyb_get_repl_uart'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("Get REPL UART");
		this.setInputsInline(true);
		this.setOutput(true);
		this.setTooltip('Get the UART object that the REPL is repeated on.');
	}
};
Blockly.Python['pyb_get_repl_uart'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.repl_uart()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// rng()
Blockly.Blocks['pyb_rng'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("Get random number");
		this.setInputsInline(true);
		this.setOutput(true);
		this.setTooltip('Return a 30-bit hardware generated random number.');
	}
};
Blockly.Python['pyb_rng'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.rng()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

//sync
Blockly.Blocks['pyb_sync'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
				.appendField("Sync file systems");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Sync all file systems.');
	}
};

Blockly.Python['pyb_sync'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.sync()\n';
	return code;
};

//unique_id
Blockly.Blocks['pyb_unique_id'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
				.appendField("Get unique ID");
		this.setInputsInline(true);
		this.setOutput(true);
		this.setTooltip('Returns a string of 12 bytes (96 bits), which is the unique ID for the MCU.');
	}
};

Blockly.Python['pyb_unique_id'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.unique_id()';
	return code;
};