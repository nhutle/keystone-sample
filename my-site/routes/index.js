var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
  res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
  var title, message;

  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }

  res.err(err, title, message);
});

// Load Routes
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

// Bind Routes
exports = module.exports = function(app) {
  // app.get('/blog/:category?', routes.views.blog);
  // app.get('/blog/post/:post', routes.views.post);
  app.use('api/posts', keystone.middleware.api, routes.api.post);
  // app.use('/people', people);

  // app.get('/api/posts', keystone.middleware.api, routes.api.post.list);
  // app.get('/api/posts/:id', keystone.middleware.api, routes.api.post.get);
  // app.post('/api/posts', keystone.middleware.api, routes.api.post.create);
};
