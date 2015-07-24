var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Footer Model
 */
var Footer = new keystone.List('Footer');

Footer.add({
  title: {
    type: Types.Text,
    require: true,
    initial: true
  },
  body: {
    type: Types.Html,
    wysiwyg: true
  }
});

Footer.defaultColumns = 'title, body';

/**
 * Registration
 */
Footer.register();
