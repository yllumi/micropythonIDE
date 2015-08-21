// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#frfjnd
Blockly.Blocks['import_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan LED");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_led'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import LED\n';
  return code;
};

// LED Object Create
//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6bmo5k
Blockly.Blocks['led_create_direct'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(255);
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "lednum")
        .appendField(new Blockly.FieldDropdown([["Nyala", "on"], ["Mati", "off"], ["Nyala-Mati", "toggle"]]), "ledmode");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Access LED object directly');
  }
};
Blockly.Python['led_create_direct'] = function(block) {
  var dropdown_lednum = block.getFieldValue('lednum');
  var dropdown_ledmode = block.getFieldValue('ledmode');
  // TODO: Assemble Python into code variable.
  var code = 'pyb.LED(' + dropdown_lednum + ').' + dropdown_ledmode + '()\n';
  return code;
};

// LED Object Create
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rw5nqw
Blockly.Blocks['led_create'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(255);
	this.appendDummyInput()
		.appendField("Objek LED")
		.appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "lednum");
	this.setInputsInline(true);
	this.setOutput(true, "object");
	this.setTooltip('Create and return LED object');
  }
};
Blockly.Python['led_create'] = function(block) {
	var dropdown_lednum = block.getFieldValue('lednum');
	// TODO: Assemble Python into code variable.
	var code = 'pyb.LED(' + dropdown_lednum + ')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// led intensity
Blockly.Blocks['led_set_intensity'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(285);
    this.appendDummyInput()
        .appendField("set intensitas ke")
        .appendField(new Blockly.FieldTextInput("0"), "intensity")
        .appendField("/255");
    this.setInputsInline(true);
    this.setOutput(true, "property");
    this.setTooltip('Set LED intensity');
  }
};
Blockly.Python['led_set_intensity'] = function(block) {
  var text_intensity = block.getFieldValue('intensity');
  // TODO: Assemble Python into code variable.
  var code = 'intensity(' + text_intensity + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// led on
Blockly.Blocks['led_set_on'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(285);
    this.appendDummyInput()
        .appendField("nyalakan");
    this.setOutput(true, "property");
    this.setTooltip('Set LED on');
  }
};
Blockly.Python['led_set_on'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'on()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// led off
Blockly.Blocks['led_set_off'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(285);
    this.appendDummyInput()
        .appendField("matikan");
    this.setOutput(true, "property");
    this.setTooltip('Set LED off');
  }
};
Blockly.Python['led_set_off'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'off()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// led toggle
Blockly.Blocks['led_set_toggle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(285);
    this.appendDummyInput()
        .appendField("nyalakan/matikan");
    this.setOutput(true, "property");
    this.setTooltip('Set LED toggle');
  }
};
Blockly.Python['led_set_toggle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'toggle()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};