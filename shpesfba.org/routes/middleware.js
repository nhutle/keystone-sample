var _ = require('underscore'),
  keystone = require('keystone'),
  moment = require('moment'),
  Event = keystone.list('Event'),
  Footer = keystone.list('Footer');

exports.initLocals = function(req, res, next) {
  var locals = res.locals;

  locals.navLinks = [{
    label: 'Home',
    key: 'home',
    href: '/'
  }, {
    label: 'Membership',
    key: 'membership',
    href: '/membership'
  }, {
    label: 'Jobs',
    key: 'jobs',
    href: '/jobs'
  }, {
    label: 'Gallery',
    key: 'gallery',
    href: '/gallery'
  }, {
    label: 'Executive Board',
    key: 'board',
    href: '/executive-board'
  }, {
    label: 'Chapter History',
    key: 'history',
    href: '/chapter-history'
  }];

  locals.user = req.user;

  locals.getStartTime = function(date) {
    return moment(date).format('h:mma');
  };
  locals.getEndTime = function(date) {
    return moment(date).format('h:mma');
  };
  locals.getDate = function(date) {
    return moment(date).format('MMMM D, YYYY');
  };

  next();
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(flashMessages, function(msgs) {
    return msgs.length;
  }) ? flashMessages : false;

  next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};
