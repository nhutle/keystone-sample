var keystone = require('keystone');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = 'gallery';

  var galleryQuery = keystone
    .list('Gallery')
    .model
    .find()
    .sort('sortOrder');

  view.query('galleries', galleryQuery);

  view.render('gallery');
}
