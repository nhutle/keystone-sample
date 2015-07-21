var keystone = require('keystone');

require('dotenv').load();

keystone.init({
  'name': 'My site',

  'brand': 'My site',

  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': 'public',

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,

  'mongo': process.env.MONGO_URI,

  'session': true,

  'auth': true,

  'user model': 'User',

  'cookie secret': process.env.COOKIE_SECRET,

  'session store': 'connect-mongo',

  'cloudinary config': process.env.CLOUDINARY_URL,
  'cloudinary prefix': process.env.CLOUDINARY_PREFIX,

  'embedly api key': process.env.EMBEDLY_APIKEY,

  'mandrill api key': process.env.MANDRILL_APIKEY,
  'mandrill username': process.env.MANDRILL_USERNAME
});

require('./models');

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
  'list of users': 'users',
  'list of posts': ['posts', 'post-comments', 'post-categories']
});

keystone.start();
