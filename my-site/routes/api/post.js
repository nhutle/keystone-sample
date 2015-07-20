var keystone = require('keystone'),
  Post = keystone.list('Post'),
  async = require('async'),
  express = require('express'),
  router = express.Router(),
  postAPI = {};

/**
 * list posts
 */
router.get('/', function(req, res) {
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
});

router.get('/:id', function(req, res) {
  Post.model
    .findById(req.params.id)
    .populate('author', 'name')
    .populate('categories', 'name')
    .exec(function(err, item) {
      if (err) return res.apiError('database error', err);

      if (!item) return res.apiError('not found');

      res.apiResponse({
        post: item
      });
    });
})
// postAPI.list = function(req, res) {
//   Post
//     .paginate({
//       page: req.query.page || 1,
//       perPage: req.query.perPage || 10,
//       maxPage: 1
//     })
//     .where('state', 'published')
//     .sort('-publishedAt')
//     .populate('author', 'name')
//     .populate('categories', 'name')
//     .exec(function(err, items) {
//       if (err) return res.apiError('database error', err);

//       res.apiResponse({
//         posts: items
//       });
//     });
// };

/**
 * get post by _id
 */
postAPI.get = function(req, res) {
  Post.model
    .findById(req.params.id)
    .populate('author', 'name')
    .populate('categories', 'name')
    .exec(function(err, item) {
      if (err) return res.apiError('database error', err);

      if (!item) return res.apiError('not found');

      res.apiResponse({
        post: item
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
  Post.model.findById(req.params.id).exec(function(err, item) {
    if (err) return res.apiError('database error', err);

    if (!item) return res.apiError('not found');

    var data = (req.method === 'POST') ? req.body : req.query;

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
  Post.model.findById(req.params.id).exec(function(err, item) {
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

postAPI.createPost = function(req, res) {
  var newPost = new Post.model({
    title: 'New Post'
  });

  newPost.save(function(err) {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
      post: newPost
    });
  });
};

postAPI.removePost = function(req, res) {
  Post.model.findById(req.params.id).remove(function(err) {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
      success: true
    });
  });
};

// exports = module.exports = postAPI;

exports = module.exports = router;
