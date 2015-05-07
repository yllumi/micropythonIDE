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

// set angle()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qkm8pu
Blockly.Blocks['servo_set_angle'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(240);
	this.appendDummyInput()
		.appendField("set angle")
		.appendField(new Blockly.FieldAngle("0"), "angle")
		.appendField("for")
		.appendField(new Blockly.FieldTextInput("0"), "time")
		.appendField("milliseconds");
	this.setInputsInline(true);
	this.setOutput(true, "property");
	this.setTooltip('Set servo angle. Usually works at 90 to -90 degrees');
  }
};
Blockly.Python['servo_set_angle'] = function(block) {
  var angle_angle = block.getFieldValue('angle');
  var text_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  if(text_time.length == '0')
  	var code = 'angle(' + angle_angle + ')';
  else
  	var code = 'angle(' + angle_angle + ', ' + text_time + ')';

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// get angle()
Blockly.Blocks['servo_get_angle'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(240);
	this.appendDummyInput()
		.appendField("get angle");
	this.setOutput(true, "Number");
	this.setTooltip('Get current servo angle.');
  }
};
Blockly.Python['servo_get_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'angle()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// set speed()
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i2srv5
Blockly.Blocks['servo_set_speed'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("set speed")
        .appendField(new Blockly.FieldTextInput("0"), "speed")
        .appendField("for")
        .appendField(new Blockly.FieldTextInput("0"), "time")
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setOutput(true, "property");
    this.setTooltip('Set servo angle. Works at -100 to 100.');
  }
};
Blockly.Python['servo_set_speed'] = function(block) {
  var text_speed = block.getFieldValue('speed');
  var text_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  if(text_time.length == '0')
  	var code = 'speed(' + text_speed + ')';
  else
  	var code = 'speed(' + text_speed + ', ' + text_time + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// get speed()
Blockly.Blocks['servo_get_speed'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(240);
	this.appendDummyInput()
		.appendField("get speed");
	this.setOutput(true, "Number");
	this.setTooltip('Get current servo speed.');
  }
};
Blockly.Python['servo_get_speed'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'speed()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// get pulsewidth()
Blockly.Blocks['servo_get_pulsewidth'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(240);
	this.appendDummyInput()
		.appendField("get pulse width");
	this.setOutput(true, "Number");
	this.setTooltip('Get current raw pulse width.');
  }
};
Blockly.Python['servo_get_pulsewidth'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'pulse_width()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// set pulse_width()
Blockly.Blocks['servo_set_pulsewidth'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("set pulse width to")
        .appendField(new Blockly.FieldTextInput("0"), "pulsewidth");
    this.setInputsInline(true);
    this.setOutput(true, "property");
    this.setTooltip('Set servo pulse width');
  }
};
Blockly.Python['servo_set_pulsewidth'] = function(block) {
  var text_pulsewidth = block.getFieldValue('pulsewidth');
  // TODO: Assemble Python into code variable.
  var code = 'pulse_width(' + text_pulsewidth + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// set calibration()
Blockly.Blocks['servo_set_calibration'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("set calibration");
    this.appendValueInput("pulse_min")
        .setCheck("Number")
        .appendField("pulse_min");
    this.appendValueInput("pulse_max")
        .setCheck("Number")
        .appendField("pulse_max");
    this.appendValueInput("pulse_center")
        .setCheck("Number")
        .appendField("pulse_center");
    this.appendValueInput("pulse_angle_90")
        .setCheck("Number")
        .appendField("pulse_angle_90");
    this.appendValueInput("pulse_speed_100")
        .setCheck("Number")
        .appendField("pulse_speed_100");
    this.setOutput(true, "property");
    this.setTooltip('set servo calibration');
  }
};
Blockly.Python['servo_set_calibration'] = function(block) {
  var value_pulse_min = Blockly.Python.valueToCode(block, 'pulse_min', Blockly.Python.ORDER_NONE) || '0';
  var value_pulse_max = Blockly.Python.valueToCode(block, 'pulse_max', Blockly.Python.ORDER_NONE) || '0';
  var value_pulse_center = Blockly.Python.valueToCode(block, 'pulse_center', Blockly.Python.ORDER_NONE) || '0';
  var value_pulse_angle_90 = Blockly.Python.valueToCode(block, 'pulse_angle_90', Blockly.Python.ORDER_NONE) || '0';
  var value_pulse_speed_100 = Blockly.Python.valueToCode(block, 'pulse_speed_100', Blockly.Python.ORDER_NONE) || '0';
  // TODO: Assemble Python into code variable.
  var code = 'calibration(' + value_pulse_min + ',' + value_pulse_max + ',' + value_pulse_center;
  if(value_pulse_angle_90 != '0'){
  	if(value_pulse_speed_100 != '0'){
  		code += ',' + value_pulse_angle_90 + ',' + value_pulse_speed_100;
  	} else {
  		code += ',' + value_pulse_angle_90;
  	}
  }
  code += ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// get calibration()
Blockly.Blocks['servo_get_calibration'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setColour(240);
	this.appendDummyInput()
		.appendField("get calibration");
	this.setOutput(true, "Number");
	this.setTooltip('Get current servo calibration.');
  }
};
Blockly.Python['servo_get_calibration'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'calibration()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};