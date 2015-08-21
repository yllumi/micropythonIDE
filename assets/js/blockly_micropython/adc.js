// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#frfjnd
Blockly.Blocks['import_adc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan Analog to Digital");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_adc'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import ADC\n';
  return code;
};

// Servo Object Create
Blockly.Blocks['adc_create'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(180);
	this.appendDummyInput()
		.appendField("Objek ADC pada pin")
		.appendField(new Blockly.FieldDropdown([["X1", "'X1'"], ["X2", "'X2'"], ["X3", "'X3'"], ["X4", "'X4'"], ["X5", "'X5'"], ["X6", "'X6'"], ["X7", "'X7'"], ["X8", "'X8'"], ["X11", "'X11'"], ["X12", "'X12'"], ["X19", "'X19'"], ["X20", "'X20'"], ["X21", "'X21'"], ["X22", "'X22'"], ["Y11", "'Y11'"], ["Y12", "'Y12'"]]), "pin_id");
	this.setInputsInline(true);
	this.setOutput(true, "object");
	this.setTooltip('Create and return ADC object');
  }
};
Blockly.Python['adc_create'] = function(block) {
	var dropdown_pin_id = block.getFieldValue('pin_id');
	// TODO: Assemble Python into code variable.
	var code = 'pyb.ADC(pyb.Pin(' + dropdown_pin_id + '))';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// adc.read()
Blockly.Blocks['adc_read'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(195);
	this.appendDummyInput()
		.appendField("ambil nilainya");
	this.setOutput(true, "property");
	this.setTooltip('Read ADC value.');
  }
};
Blockly.Python['adc_read'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'read()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// adc.read_timed()
Blockly.Blocks['adc_read_timed'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(195);
    this.appendDummyInput()
        .appendField("read timed, into buffer")
        .appendField(new Blockly.FieldVariable("item"), "buffer")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput("10"), "freq")
        .appendField("Hz");
    this.setOutput(true, "property");
    this.setTooltip('Read analog values into the given buffer at the given frequency.');
  }
};
Blockly.Python['adc_read_timed'] = function(block) {
  var variable_buffer = Blockly.Python.variableDB_.getName(block.getFieldValue('buffer'), Blockly.Variables.NAME_TYPE);
  var text_freq = block.getFieldValue('freq');
  // TODO: Assemble Python into code variable.
  var code = 'read_timed(' + variable_buffer + ',' + text_freq + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};