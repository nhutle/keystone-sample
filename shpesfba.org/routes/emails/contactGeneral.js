var keystone = require('keystone'),
  Enquiry = keystone.list('Enquiry');

module.exports = function(req, res, next) {
  var body = req.body,
    message = body.message,
    first = body.name.split(' ')[0],
    last = body.name.split(' ')[1] || '';

  if (body.honeypot) {
    return next(new Error('Robot is trying to spam'));
  }

  var enquiry = new Enquiry.model({
    name: {
      first: first,
      last: last
    },
    email: body.email || 'n/a',
    enquiryType: 'message',
    message: {
      md: message
    }
  });

  enquiry
    .getUpdateHandler(req, res)
    .process(req.body, function(err) {
      if (err) return next(err);

      req.flash(
        'success',
        'Your enquiry has been recieved. We will email a response.'
      );
      res.redirect('/');
    });
};
