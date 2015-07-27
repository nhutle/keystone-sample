var keystone = require('keystone'),
  Job = keystone.list('Job');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'jobs';
  locals.filters = {
    job: req.params.job
  };

  view.on('init', function(next) {
    Job
      .model
      .findById(locals.filters.job)
      .sort('sortOrder')
      .exec(function(err, result) {
        locals.job = result;
        next(err);
      });
  });

  view.render('job');
};
