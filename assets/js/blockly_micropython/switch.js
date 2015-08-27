Blockly.Blocks['switch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tombol switch ditekan");
    this.setOutput(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['switch'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'pyb.Switch()()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};