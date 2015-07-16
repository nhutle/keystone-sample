var keystone = require('keystone');

keystone.init({
  'name': 'My Site',

  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': 'public',

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/my-site',

  'session': true,
  'auth': true,
  'user model': 'User', // model for authentication purpose
  'cookie secret': 'this-is-a-secret-key',
  'session store': 'connect-mongo', // save session to db
});

require('./models');

// keystone.set('locals', {
//   _: require('lodash'),
//   env: keystone.get('env'),
//   utils: keystone.utils,
//   editable: keystone.content.editable
// });

keystone.set('routes', require('./routes'));

keystone.set('nav', {
  'list of users': 'users',
  'list of posts': ['posts', 'post-comments', 'post-categories']
});

keystone.start();
