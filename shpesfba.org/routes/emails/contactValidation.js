var form = require('express-form'),
  field = form.field;

module.exports = form(
  field('name')
    .trim()
    .required(),
  field('email')
    .trim()
    .required()
    .isEmail,
  field('message')
    .trim()
    .required()
);
