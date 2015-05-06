// create pin object
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zgb7xo
Blockly.Blocks['pin_create'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("Pin Object")
        .appendField(new Blockly.FieldDropdown([["X1", "'X1'"], ["X2", "'X2'"], ["X3", "'X3'"], ["X4", "'X4'"], ["X5", "'X5'"], ["X6", "'X6'"], ["X7", "'X7'"], ["X8", "'X8'"], ["X9", "'X9'"], ["X10", "'X10'"], ["X11", "'X11'"], ["X12", "'X12'"], ["X17", "'X17'"], ["X18", "'X18'"], ["X19", "'X19'"], ["X20", "'X20'"], ["X21", "'X21'"], ["X22", "'X22'"], ["Y1", "'Y1'"], ["Y2", "'Y2'"], ["Y3", "'Y3'"], ["Y4", "'Y4'"], ["Y5", "'Y5'"], ["Y6", "'Y6'"], ["Y7", "'Y7'"], ["Y8", "'Y8'"], ["Y9", "'Y9'"], ["Y10", "'Y10'"], ["Y11", "'Y11'"], ["Y12", "'Y12'"]]), "pin_id")
        .appendField("mode")
        .appendField(new Blockly.FieldDropdown([["IN", "pyb.Pin.IN"], ["OUT_PP", "pyb.Pin.OUT_PP"], ["OUT_OD", "pyb.Pin.OUT_OD"], ["AF_PP", "pyb.Pin.AF_PP"], ["AF_OD", "pyb.Pin.AF_OD"], ["ANALOG", "pyb.Pin.ANALOG"]]), "pin_mode")
        .appendField("pull")
        .appendField(new Blockly.FieldDropdown([["PULL_NONE", "pyb.Pin.PULL_NONE"], ["PULL_UP", "pyb.Pin.PULL_UP"], ["PULL_DOWN", "pyb.Pin.PULL_DOWN"]]), "pin_pull")
        .appendField("af")
        .appendField(new Blockly.FieldTextInput("-1"), "af");
    this.setInputsInline(true);
    this.setOutput(true, "object");
    this.setTooltip('Create Pin object');
  }
};
Blockly.Python['pin_create'] = function(block) {
  var dropdown_pin_id = block.getFieldValue('pin_id');
  var dropdown_pin_mode = block.getFieldValue('pin_mode');
  var dropdown_pin_pull = block.getFieldValue('pin_pull');
  var text_af = block.getFieldValue('af');
  // TODO: Assemble Python into code variable.
  var code = 'pyb.Pin(' + dropdown_pin_id + ', ' + dropdown_pin_mode + ', ' + dropdown_pin_pull + ', ' + text_af + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// simple Pin Create
Blockly.Blocks['pin_create_simple'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("Pin Object")
        .appendField(new Blockly.FieldDropdown([["X1", "'X1'"], ["X2", "'X2'"], ["X3", "'X3'"], ["X4", "'X4'"], ["X5", "'X5'"], ["X6", "'X6'"], ["X7", "'X7'"], ["X8", "'X8'"], ["X9", "'X9'"], ["X10", "'X10'"], ["X11", "'X11'"], ["X12", "'X12'"], ["X17", "'X17'"], ["X18", "'X18'"], ["X19", "'X19'"], ["X20", "'X20'"], ["X21", "'X21'"], ["X22", "'X22'"], ["Y1", "'Y1'"], ["Y2", "'Y2'"], ["Y3", "'Y3'"], ["Y4", "'Y4'"], ["Y5", "'Y5'"], ["Y6", "'Y6'"], ["Y7", "'Y7'"], ["Y8", "'Y8'"], ["Y9", "'Y9'"], ["Y10", "'Y10'"], ["Y11", "'Y11'"], ["Y12", "'Y12'"]]), "pin_id");
    this.setInputsInline(true);
    this.setOutput(true, "object");
    this.setTooltip('Create Pin object with simple parameter');
  }
};

Blockly.Python['pin_create_simple'] = function(block) {
  var dropdown_pin_id = block.getFieldValue('pin_id');
  // TODO: Assemble Python into code variable.
  var code = 'pyb.Pin(' + dropdown_pin_id + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// pin high()
Blockly.Blocks['pin_high'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(30);
    this.appendDummyInput()
        .appendField("set high");
    this.setOutput(true, "property");
    this.setTooltip('Set the pin to a high logic level');
  }
};
Blockly.Python['pin_high'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'high()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// pin low()
Blockly.Blocks['pin_low'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(30);
    this.appendDummyInput()
        .appendField("set low");
    this.setOutput(true, "property");
    this.setTooltip('Set the pin to a low logic level');
  }
};
Blockly.Python['pin_low'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'low()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// get pin value()
Blockly.Blocks['pin_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(30);
    this.appendDummyInput()
        .appendField("get value");
    this.setOutput(true, "property");
    this.setTooltip('Get pin value');
  }
};
Blockly.Python['pin_value'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};