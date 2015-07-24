var keystone = require('keystone'),
  Membership = keystone.list('Membership');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'membership';

  Membership
    .model
    .find()
    .exec(function(err, memberships) {
      if (err) return next(err);

      locals.memberships = memberships;
      view.render('membership');
    });
};
