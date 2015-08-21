// create object
Blockly.Blocks['ultrasonic_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Objek Sensor Ultrasonic, pada pin")
        .appendField(new Blockly.FieldDropdown([["2P1", "2p1"], ["2P2", "2p2"]]), "2p_pin");
    this.setOutput(true);
    this.setColour(255);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['ultrasonic_create'] = function(block) {
  var dropdown_2p_pin = block.getFieldValue('2p_pin');
  // TODO: Assemble Python into code variable.
  var code = '';
  if(dropdown_2p_pin == "2p1")
  	code = "ultrasonic.Ultrasonic(pyb.Pin('Y9'), pyb.Pin('Y10'))";
  else
  	code = "ultrasonic.Ultrasonic(pyb.Pin('X9'), pyb.Pin('X10'))";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
// import
Blockly.Blocks['import_ultrasonic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan Sensor Ultrasonic");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_ultrasonic'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "import ultrasonic\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
// get cm
Blockly.Blocks['ultrasonic_get_cm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ambil nilai jarak (cm)");
    this.setOutput(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['ultrasonic_get_cm'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'distance_in_cm()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
// get inches
Blockly.Blocks['ultrasonic_get_inches'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ambil nilai jarak (inch)");
    this.setOutput(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['ultrasonic_get_inches'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'distance_in_inches()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};