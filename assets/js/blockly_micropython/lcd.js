// import LCD
Blockly.Blocks['import_lcd'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan LCD pada I2C")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "i2cnum");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_lcd'] = function(block) {
  var dropdown_i2cnum = block.getFieldValue('i2cnum');
  // TODO: Assemble Python into code variable.
  var code = "from i2c_lcd import I2C_LCD\n" + "i2clcd = I2C_LCD(" + dropdown_i2cnum + ", 0x27, 2, 16)\n";
  return code;
};

// import LCD extended
Blockly.Blocks['import_lcd_ext'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gunakan LCD pada I2C")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "i2cnum")
        .appendField(", LCD addr")
        .appendField(new Blockly.FieldTextInput("0x27"), "lcd_addr")
        .appendField(", baris")
        .appendField(new Blockly.FieldTextInput("2"), "lcd_row")
        .appendField(", kolom")
        .appendField(new Blockly.FieldTextInput("16"), "lcd_col");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['import_lcd_ext'] = function(block) {
  var dropdown_i2cnum = block.getFieldValue('i2cnum');
  var text_lcd_addr = block.getFieldValue('lcd_addr');
  var text_lcd_row = block.getFieldValue('lcd_row');
  var text_lcd_col = block.getFieldValue('lcd_col');
  // TODO: Assemble Python into code variable.
  var code = "from i2c_lcd import I2C_LCD\n" + "i2clcd = I2C_LCD(" + dropdown_i2cnum + ", " + text_lcd_addr + ", " + text_lcd_row + ", " + text_lcd_col + ")\n";
  return code;
};

// clear()
Blockly.Blocks['lcd_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD bersihkan");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_clear'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "i2clcd.clear()\n";
  return code;
};

//putstr()
Blockly.Blocks['lcd_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD cetak");
    this.appendValueInput("lcd_text")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_write'] = function(block) {
  var value_lcd_text = Blockly.Python.valueToCode(block, 'lcd_text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.putstr('+value_lcd_text+')\n';
  return code;
};

//putchar()
Blockly.Blocks['lcd_write_char'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD cetak karakter");
    this.appendValueInput("lcd_text")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_write_char'] = function(block) {
  var value_lcd_text = Blockly.Python.valueToCode(block, 'lcd_text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.putchar('+value_lcd_text+')\n';
  return code;
};

//newline
Blockly.Blocks['lcd_newline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD cetak baris baru");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_newline'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "i2clcd.putstr('\\\\n')\n";
  return code;
};

// backlight
Blockly.Blocks['lcd_backlight'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD cahaya latar")
        .appendField(new Blockly.FieldDropdown([["nyalakan", "on"], ["matikan", "off"]]), "backlight_val");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_backlight'] = function(block) {
  var dropdown_backlight_val = block.getFieldValue('backlight_val');
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.backlight_'+dropdown_backlight_val+'()\n';
  return code;
};

// display
Blockly.Blocks['lcd_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD Tampilan")
        .appendField(new Blockly.FieldDropdown([["aktifkan", "on"], ["nonaktifkan", "off"]]), "display_val");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_display'] = function(block) {
  var dropdown_display_val = block.getFieldValue('display_val');
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.display_'+dropdown_display_val+'()\n';
  return code;
};

// kursor
Blockly.Blocks['lcd_cursor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD kursor")
        .appendField(new Blockly.FieldDropdown([["tampilkan", "show"], ["sembunyikan", "hide"]]), "kursor_val");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_cursor'] = function(block) {
  var dropdown_kursor_val = block.getFieldValue('kursor_val');
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.'+dropdown_kursor_val+'_cursor()\n';
  return code;
};

// kursor
Blockly.Blocks['lcd_blink_cursor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD blink kursor")
        .appendField(new Blockly.FieldDropdown([["aktifkan", "on"], ["nonaktifkan", "off"]]), "kursor_val");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_blink_cursor'] = function(block) {
  var dropdown_kursor_val = block.getFieldValue('kursor_val');
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.blink_cursor_'+dropdown_kursor_val+'()\n';
  return code;
};


// moveto
Blockly.Blocks['lcd_moveto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LCD pindahkan kursor ke posisi: baris")
        .appendField(new Blockly.FieldTextInput("1"), "baris_var")
        .appendField("kolom")
        .appendField(new Blockly.FieldTextInput("1"), "kolom_var");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['lcd_moveto'] = function(block) {
  var text_baris_var = block.getFieldValue('baris_var');
  var text_kolom_var = block.getFieldValue('kolom_var');
  // TODO: Assemble Python into code variable.
  var code = 'i2clcd.move_to('+ (parseInt(text_baris_var)-1) +','+ (parseInt(text_kolom_var)-1) +')\n';
  return code;
};