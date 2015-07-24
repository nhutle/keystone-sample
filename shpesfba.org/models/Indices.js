var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Index Model
 */
var Index = new keystone.List('Index');

Index.add({
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

Index.defaultColumns = 'title, body';

/**
 * Registration
 */
Index.register();
