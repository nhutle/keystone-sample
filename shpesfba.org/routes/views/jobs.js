var keystone = require('keystone'),
  Job = keystone.list('Job');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'jobs';

  // view.on('init', function(next) {
  //   Job
  //     .model
  //     .find()
  //     .sort('sortOrder')
  //     .exec(function(err, results) {
  //       locals.jobs = results;
  //       next(err);
  //     });
  // });

  // Build new query
  var jobsQuery = keystone
    .list('Job')
    .model
    .find()
    .sort('sortOrder');

  // excute the query and make it available to the view
  view.query('jobs', jobsQuery);

  view.render('jobs');
};
