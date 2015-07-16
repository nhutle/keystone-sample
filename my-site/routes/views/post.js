var keystone = require('keystone'),
  async = require('async'),
  Post = keystone.list('Post'),
  PostComment = keystone.list('PostComment');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  // Init locals
  locals.section = 'post';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    post: []
  };

  // load current post
  // view.on('init', function(next) {
  //   var q = Post.model.findOne({

  //   })
  // })
}
