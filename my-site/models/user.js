var keystone = require('keystone'),
  Types = keystone.Field.Types;

var User = new keystone.List('User', {
  label: 'User',
  singular: 'user',
  plural: 'users',
  searchFields: 'name'
});

User.add({
  name: {
    type: Types.Name,
    required: true,
    initial: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: { unique: true }
  },
  password: {
    type: Types.Password,
    initial: true,
    require: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can Access Keystone'
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
