var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Officier Module
 */
var Officer = new keystone.List('Officer', {
  sortable: true
});

Officer.add({
  name: {
    type: Types.Name,
    initial: true,
    required: true
  },
  role: {
    type: Types.Text
  },
  bio: {
    type: Types.Textarea
  },
  photo: {
    type: Types.CloudinaryImage
  },
  email: {
    type: Types.Email
  }
});

Officer.defaultColumns = 'name';

/**
 * Registration
 */
Officer.register();
