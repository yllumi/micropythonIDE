// Accelerometer
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#nimoyg
Blockly.Blocks['accel_create'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(225);
		this.appendDummyInput()
				.appendField("Accelerometer Object");
		this.setInputsInline(true);
		this.setOutput(true, "object");
		this.setTooltip('Create and return an accelerometer object.');
	}
};
Blockly.Python['accel_create'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = 'pyb.Accel()';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

// return accel x
Blockly.Blocks['accel_x'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("get x-axis");
    this.setOutput(true, "property");
    this.setTooltip('Get accel x');
  }
};
Blockly.Python['accel_x'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'x()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// return accel y
Blockly.Blocks['accel_y'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("get y-axis");
    this.setOutput(true, "property");
    this.setTooltip('Get accel y');
  }
};
Blockly.Python['accel_y'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'y()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// return accel z
Blockly.Blocks['accel_z'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("get z-axis");
    this.setOutput(true, "property");
    this.setTooltip('Get accel z');
  }
};
Blockly.Python['accel_z'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'z()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// return accel tilt register
Blockly.Blocks['accel_tilt'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("get tilt register");
    this.setOutput(true, "property");
    this.setTooltip('Get accel tilt register');
  }
};
Blockly.Python['accel_tilt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'tilt()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};