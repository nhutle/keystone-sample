var keystone = require('keystone'),
  Types = keystone.Field.Types;

var PostComment = new keystone.List('PostComment', {
  label: 'Comment',
  singular: 'comment',
  plural: 'comments'
});

PostComment.add({
  author: {
    type: Types.Relationship,
    initial: true,
    ref: 'User',
    // index: true
  },
  post: {
    type: Types.Relationship,
    initial: true,
    ref: 'Post',
    // index: true
  },
  commentState: {
    type: Types.Select,
    options: ['published', 'draft', 'archived'],
    default: 'published',
    // index: true
  },
  publishOn: {
    type: Types.Date,
    default: Date.now,
    noedit: true,
    // index: true
  }
}, 'Content', {
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 300
  }
});


// PostComment.schema.pre('save', function(next) {

// })
//

PostComment.track = true;

PostComment.defaultColumns = 'author, post, publishedOn, commentState';

PostComment.register();
