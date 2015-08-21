// bytearray()
Blockly.Blocks['list_bytearray'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendDummyInput()
        .appendField("create array of ")
        .appendField(new Blockly.FieldTextInput("100"), "byte")
        .appendField("bytes");
    this.setOutput(true, "Array");
    this.setTooltip('create a buffer of n bytes');
  }
};
Blockly.Python['list_bytearray'] = function(block) {
  var text_byte = block.getFieldValue('byte');
  // TODO: Assemble Python into code variable.
  var code = 'bytearray(' + text_byte + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};