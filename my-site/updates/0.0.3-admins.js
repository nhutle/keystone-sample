var keystone = require('keystone'),
  User = keystone.list('User');

exports = module.exports = function(done) {

  // new User.model({
  //   name: {
  //     first: 'Admin',
  //     last: 'User'
  //   },
  //   email: 'admin@keystonejs.com',
  //   password: 'admin',
  //   canAccessKeystone: true
  // }).save(done);

  new User.model({
    name: {
      first: 'Admin',
      last: 'User'
    },
    email: 'admin2@keystonejs.com',
    password: 'admin2',
    canAccessKeystone: true
  }).save(done);

};
