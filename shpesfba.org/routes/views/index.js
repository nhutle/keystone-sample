var keystone = require('keystone'),
  Index = keystone.list('Index');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'home';

  Index
    .model
    .find()
    .exec(function(err, copies) {
      if (err) return next(err);

      locals.copies = copies;
      view.render('index');
    });
};
