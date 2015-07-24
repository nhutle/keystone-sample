var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Membership Model
 */
var Membership = new keystone.List('Membership');

Membership.add({
  title: {
    type: Types.Text,
    require: true,
    initial: true
  },
  price: {
    type: Types.Text
  },
  body: {
    type: Types.Html,
    wysiwyg: true
  }
});

Membership.defaultColumns = 'title, body, price';

/**
 * Registration
 */
Membership.register();
