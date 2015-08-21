// create object
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mu9fbw
Blockly.Blocks['obj_create'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(90);
		this.appendDummyInput()
				.appendField("Set")
				.appendField(new Blockly.FieldVariable("obj"), "object")
				.appendField("dengan");
		this.appendValueInput("object")
				.setCheck("object");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Create object');
	}
};
Blockly.Python['obj_create'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var value_object = Blockly.Python.valueToCode(block, 'object', Blockly.Python.ORDER_NONE) || '0';
	// TODO: Assemble Python into code variable.
	var code = variable_object + ' = ' + value_object + '\n';
	return code;
};

// return object
Blockly.Blocks['obj_return'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(90);
		this.appendDummyInput()
				.appendField(new Blockly.FieldVariable("obj"), "object");
		this.setInputsInline(true);
		this.setOutput(true, "object");
		this.setTooltip('return object');
	}
};
Blockly.Python['obj_return'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble Python into code variable.
	var code = variable_object;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// return object property
Blockly.Blocks['obj_return_property'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(90);
		this.appendDummyInput()
			.appendField("Ambil")
			.appendField(new Blockly.FieldVariable("obj"), "object");
		this.appendValueInput("property")
		.setCheck("property");
		this.setInputsInline(true);
		this.setOutput(true);
		this.setTooltip('call property or method of object');
	}
};
Blockly.Python['obj_return_property'] = function(block) {
	var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
	var value_property = Blockly.Python.valueToCode(block, 'property', Blockly.Python.ORDER_NONE) || '0';
	// TODO: Assemble Python into code variable.
	var code = variable_object + '.' + value_property;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// set object property
Blockly.Blocks['obj_call_property'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
    	.appendField("Panggil")
        .appendField(new Blockly.FieldVariable("obj"), "object");
    this.appendValueInput("property")
        .setCheck("property");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set object property or method');
  }
};
Blockly.Python['obj_call_property'] = function(block) {
  var variable_object = Blockly.Python.variableDB_.getName(block.getFieldValue('object'), Blockly.Variables.NAME_TYPE);
  var value_property = Blockly.Python.valueToCode(block, 'property', Blockly.Python.ORDER_NONE) || '0';
  // TODO: Assemble Python into code variable.
  var code = variable_object + '.' + value_property + '\n';
  return code;
};