// set up any code required on top of program
Blockly.Blocks['setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Mulai program");
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['setup'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'import helpers\n';
  return code;
};

// while True:
Blockly.Blocks['controls_while_true'] = {
  init: function() {
    this.appendStatementInput("while_true")
        .appendField("Jalankan terus");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['controls_while_true'] = function(block) {
  var statements_while_true = Blockly.Python.statementToCode(block, 'while_true');
  // TODO: Assemble Python into code variable.
  var code = 'while True:\n' + statements_while_true;
  return code;
};

// import ...
Blockly.Blocks['use_library'] = {
  init: function() {
    this.appendValueInput("import")
        .setCheck("library")
        .appendField("Gunakan");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(90);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['use_library'] = function(block) {
  var value_import = Blockly.Python.valueToCode(block, 'import', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'import ';
  return code;
};

// Digital Read
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#snjt87
Blockly.Blocks['digital_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Baca nilai digital pin")
        .appendField(new Blockly.FieldTextInput("X1"), "dig_pin");
    this.setOutput(true);
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['digital_read'] = function(block) {
  var text_dig_pin = block.getFieldValue('dig_pin');
  // TODO: Assemble Python into code variable.
  var code = "pyb.Pin('" + text_dig_pin + "', pyb.Pin.IN, pyb.Pin.PULL_UP).value()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Digital Write
Blockly.Blocks['digital_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tulis nilai digital pin")
        .appendField(new Blockly.FieldTextInput("X1"), "dig_pin")
        .appendField("ke")
        .appendField(new Blockly.FieldDropdown([["HIGH", "high"], ["LOW", "low"]]), "dig_val");
    this.setOutput(true);
    this.setColour(270);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['digital_write'] = function(block) {
  var text_dig_pin = block.getFieldValue('dig_pin');
  var dropdown_dig_val = block.getFieldValue('dig_val');
  // TODO: Assemble Python into code variable.
  var code = "pyb.Pin('" + text_dig_pin +"', pyb.Pin.OUT_PP).'" + dropdown_dig_val + "()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Analog Read
Blockly.Blocks['analog_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Baca nilai analog pin")
        .appendField(new Blockly.FieldTextInput("X1"), "dig_pin");
    this.setOutput(true);
    this.setColour(270);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['analog_read'] = function(block) {
  var text_dig_pin = block.getFieldValue('dig_pin');
  // TODO: Assemble Python into code variable.
  var code = "pyb.ADC(pyb.Pin('"+text_dig_pin+"')).read()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};