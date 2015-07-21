var keystone = require('keystone'),
  Types = keystone.Field.Types;

var PostComment = new keystone.List('PostComment', {
  label: 'Comment',
  singular: 'comment',
  plural: 'comments',
  searchFields: 'content'
});

PostComment.add({
  author: {
    type: Types.Relationship,
    initial: true,
    required: true,
    ref: 'User'
  },
  post: {
    type: Types.Relationship,
    initial: true,
    required: true,
    ref: 'Post'
  },
  commentState: {
    type: Types.Select,
    options: ['published', 'draft', 'archived'],
    default: 'published'
  },
  publishOn: {
    type: Types.Date,
    default: Date.now,
    noedit: true
  }
}, 'Content', {
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 300
  }
});

// PostComment.schema.pre('save', function(next) {
//   this.wasNew = this.isNew;
//   if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState == 'published') {
//     this.publishedOn = new Date();
//   }

//   next();
// });

// PostComment.schema.post('save', function() {
//   if (!this.wasNew) return;

//   if (this.author) {
//     keystone.list('User').model.findById(this.author).exec(function(err, user) {
//       return user && user.wasActive().save();
//     });
//   }
// });

PostComment.track = true;

PostComment.defaultColumns = 'author, post, publishedOn, commentState';

PostComment.register();
