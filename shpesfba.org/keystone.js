var keystone = require('keystone'),
  _ = require('underscore');

require('dotenv').load();

keystone.init({
  name: 'shpesfba.org',
  brand: 'shpesfba.org',

  static: 'public',
  sass: 'public',
  favicon: 'public/favicon.ico',
  views: 'templates/views',
  'view engine': 'jade',

  'auto update': true,

  session: true,
  'session store': 'connect-mongo',

  auth: true,
  'user model': 'User',

  compress: true,

  'mongo': process.env.MONGO_URI,

  'cloudinary config': process.env.CLOUDINARY_URL,
  'cloudinary prefix': process.env.CLOUDINARY_PREFIX,
  'cloudinary folders': true,
  'cloudinary prefix': 'shpesfba.org',

  'embedly api key': process.env.EMBEDLY_APIKEY,

  'mandrill api key': process.env.MANDRILL_APIKEY,
  'mandrill username': process.env.MANDRILL_USERNAME,

  'cookie secret': 'nf%c+UDN6Ecd!.7_rX~~bpK<7"hmDN>vm6iP>X0fTGiv9a9bFEPLLQ(OBXPsv1f;'
});

keystone.import('models');

keystone.set('locals', {
  _: _,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  'users': 'users'
});

keystone.start();
