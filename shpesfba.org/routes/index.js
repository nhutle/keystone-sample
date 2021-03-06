/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
var keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname),
  routes = { // Import Route Controllers
    views: importRoutes('./views'),
    emails: importRoutes('./emails')
  };

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Setup Route Bindings
exports = module.exports = function(app) {
  // Views
  app.get('/', routes.views.index);
  app.get('/membership', routes.views.membership);
  app.get('/jobs', routes.views.jobs);
  app.get('/jobs/:job', routes.views.job);
  app.get('/gallery', routes.views.gallery);
  app.get('/gallery/:album', routes.views.album);
  app.get('/executive-board', routes.views.executiveBoard);
  app.get('/chapter-history', routes.views.history);

  app.post('/contact-general',
    routes.emails.contactValidation,
    routes.emails.contactGeneral
  );
  // app.get('/jobs/new', routes.views.jobForm);
  // app.post('/jobs/new', routes.views.jobValidate, routes.views.jobForm);

  // app.get('/sitemap.xml', function(req, res) {
  //  sitemap.toXML(function(xml) {
  //    res.header('Content-Type', 'application/xml');
  //    res.send(xml);
  //  });
  // });

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};
