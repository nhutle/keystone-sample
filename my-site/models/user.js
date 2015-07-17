var keystone = require('keystone'),
  Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
  name: {
    type: Types.Name,
    required: true,
    // index: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    // index: true
  },
  password: {
    type: Types.Password,
    initial: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access keystone'
  }
});

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

User.relationship({
  ref: 'Post',
  path: 'author'
});

User.relationship({
  ref: 'Gallery',
  path: 'author'
});

User.track = true;

User.defaultColumns = 'name, email, isAdmin';

User.register();
