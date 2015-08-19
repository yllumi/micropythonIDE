// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#frfjnd
Blockly.Blocks['import_spi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan SPI");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_spi'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import SPI\n';
  return code;
};