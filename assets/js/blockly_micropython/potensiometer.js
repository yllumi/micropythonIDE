// read potensiometer
Blockly.Blocks['pot_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ambil nilai potensiometer");
    this.setOutput(true);
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['pot_read'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "pyb.ADC(pyb.Pin('X22')).read()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// read potensiometer from other pin
Blockly.Blocks['pot_read_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ambil nilai potensiometer, dari pin")
        .appendField(new Blockly.FieldTextInput("X7"), "NAME");
    this.setOutput(true);
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['pot_read_pin'] = function(block) {
  var text_pot_pin = block.getFieldValue('pot_pin');
  // TODO: Assemble Python into code variable.
  var code = "pyb.ADC(pyb.Pin('" + text_pot_pin + "')).read()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};