// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#frfjnd
Blockly.Blocks['import_i2c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan I2C");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_i2c'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import I2C\n';
  return code;
};