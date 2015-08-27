Blockly.Blocks['import_bt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan Bluetooth");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_bt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'bluetooth = pyb.UART(6, 9600)\nbluetooth.init(9600, bits=8, stop=1, parity=None, timeout=5000, timeout_char=10)\n';
  return code;
};

//REPL bluetooth
Blockly.Blocks['repl_bt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("REPL via Bluetooth");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['repl_bt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'pyb.repl_uart(bluetooth)\n';
  return code;
};

//readchar
Blockly.Blocks['bt_readchar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Baca karakter dari bluetooth");
    this.setOutput(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['bt_readchar'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'bluetooth.readchar()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};