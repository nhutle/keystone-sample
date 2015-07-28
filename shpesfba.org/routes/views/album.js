var keystone = require('keystone');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'gallery';
  locals.filters = {
    album: req.params.album
  };

  var albumQuery = keystone
    .list('Gallery')
    .model
    .findOne({
      key: locals.filters.album
    })
    .sort('sortOrder');

  view.query('album', albumQuery);

  view.render('album');
};
