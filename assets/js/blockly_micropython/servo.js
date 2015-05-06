// Servo Object Create
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rw5nqw
Blockly.Blocks['servo_create'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(255);
	this.appendDummyInput()
		.appendField("Servo Object")
		.appendField(new Blockly.FieldDropdown([["X1", "1"], ["X2", "2"], ["X3", "3"], ["X4", "4"]]), "servonum");
	this.setInputsInline(true);
	this.setOutput(true, "object");
	this.setTooltip('Create and return basic Servo object');
  }
};
Blockly.Python['servo_create'] = function(block) {
	var dropdown_servonum = block.getFieldValue('servonum');
	// TODO: Assemble Python into code variable.
	var code = 'pyb.Servo(' + dropdown_servonum + ')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};