var keystone = require('keystone');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  if (!req.form.isValid) {
    res.flash('error', 'err----->');
    // res.
    // next(new Error('errrrrrr-->'));
  }
};
