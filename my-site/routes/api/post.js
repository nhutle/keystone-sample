var keystone = require('keystone'),
  Post = keystone.list('Post'),
  Comment = keystone.list('PostComment'),
  async = require('async'),
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
  asyn.waterfall([
    function(callback) {
      Post
        .model
        .findById(req.params.id)
        .populate('author', 'name')
        .populate('categories', 'name')
        .exec(function(err, post) {
          // if (err) return callback({
          //   message: 'database error',
          //   status: 500
          // });

          // if (!post) return callback({
          //   message: 'not found',
          //   status: 400
          // });

          callback(null, post);
        });
    }
    // function(post, callback) {
    //   Comment
    //     .model
    //     .find({
    //       author: post.id
    //     })
    //     .exec(function(err, comments) {
    //       // if (err) return callback({
    //       //   message: 'database error',
    //       //   status: 500
    //       // });

    //       post.comments = comments;
    //       callback(null, post);
    //     });
    // }
  ], function(err, result) {
    console.log('result-->', result);
    // if (err.status === 500) return res.apiError('database error', err);

    // if (err.status === 404) return res.apiError('not found');

    // res.apiResponse({
    //   post: result
    // });
  });

  // Post
  //   .model
  //   .findById(req.params.id)
  //   .populate('author', 'name')
  //   .populate('categories', 'name')
  //   .exec(function(err, item) {
  //     if (err) return res.apiError('database error', err);

  //     if (!item) return res.apiError('not found');

  //     res.apiResponse({
  //       post: item
  //     });
  //   });
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
