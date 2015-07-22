var keystone = require('keystone'),
  async = require('async'),
  Post = keystone.list('Post'),
  Comment = keystone.list('PostComment'),
  postAPI = {};

postAPI.list = function(req, res) {
  Post
    .paginate({
      page: req.query.page || 1,
      perPage: req.query.perPage || 10,
      maxPage: 1
    })
    .where('state', 'published')
    .sort('-publishedAt')
    .populate('author', 'name')
    .populate('categories', 'name')
    .exec(function(err, items) {
      if (err) return res.apiError('database error', err);

      res.apiResponse({
        posts: items
      });
    });
};

/**
 * get post by _id
 */
postAPI.get = function(req, res) {
  async.waterfall([
    function(callback) {
      Post
        .model
        .findById(req.params.id)
        .populate('author', 'name')
        .populate('categories', 'name')
        .exec(function(err, post) {
          if (err) return callback({
            message: 'database error',
            status: 500
          });

          if (!post) return callback({
            message: 'not found',
            status: 404
          });

          callback(null, post);
        });
    },
    function(post, callback) {
      Comment
        .model
        .find()
        .where('post').equals(post.id)
        .select('content -_id')
        .exec(function(err, comment) {
          if (err) return callback({
            message: 'database error',
            status: 500
          });

          post = post.toJSON();
          post.comment = comment;
          callback(null, post);
        });
    }
  ], function (err, result) {
    if (err && err.status === 500) return res.apiError(err.message, err);

    if (err && err.status === 404) return res.apiError('not found');

    res.apiResponse({
      post: result
    });
  });
};

/**
 * create a post
 */
postAPI.create = function(req, res) {
  var item = new Post.model(),
    data = (req.method === 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {
    if (err) return res.apiError('error', err);

    res.apiResponse({
      post: item
    });
  });
};

/**
 * update post by _id
 */
postAPI.update = function(req, res) {
  Post
    .model
    .findById(req.params.id)
    .exec(function(err, item) {
      if (err) return res.apiError('database error', err);

      if (!item) return res.apiError('not found');

      var data = (req.method === 'PUT') ? req.body : req.query;

      item.getUpdateHandler(req).process(data, function(err) {
        if (err) return res.apiError('create error', err);

        res.apiResponse({
          post: item
        });
      });
    });
};

/**
 * delete post by _id
 */
postAPI.remove = function(req, res) {
  Post
    .model
    .findById(req.params.id)
    .exec(function(err, item) {
      if (err) return res.apiError('database error', error);

      if (!item) return res.apiError('not found');

      item.remove(function(err) {
        if (err) return res.apiError('database error', error);

        res.apiResponse({
          success: true
        });
      });
    });
};

exports = module.exports = postAPI;
