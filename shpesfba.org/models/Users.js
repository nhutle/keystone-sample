var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

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
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can Access Keystone',
    index: true
  }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

/**
 * Relationship
 */
User.relationship({
  ref: 'Post',
  path: 'Posts',
  refPath: 'author'
});

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
