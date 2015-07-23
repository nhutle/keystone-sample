var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Membership Model
 */
var Membership = new keystone.List('Membership');

Membership.add({
  title: {
    type: Types.Text
  },
  price: {
    type: Types.Text
  },
  body: {
    type: Types.Html,
    wysiwyg: true
  }
});

/**
 * Registration
 */
Membership.defaultColumns = 'title, body, price';
Membership.register();
