var keystone = require('keystone'),
  Officer = keystone.list('Officer');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'board';

  view.on('init', function(next) {
    Officer
      .model
      .find()
      .sort('sortOrder')
      .exec(function(err, results) {
        locals.officers = results;
        next(err);
      });
  });

  view.render('executive-board');
};
