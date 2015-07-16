var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true
  },
  map: {
    name: 'title'
  }
});

Post.add({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    index: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true
  },
  publishedDate: {
    type: Types.Date,
    index: true
  },
  content: {
    brief: {
      type: Types.Html,
      wysiwyg: true,
      height: 150
    },
    extended: {
      type: Types.Html,
      wysiwyg: true,
      height: 400
    }
  },
  categories: {
    type: Types.Relationship,
    ref: 'PostCategory',
    many: true
  }
});

Post.schema.methods.isPublished = function() {
  return this.state === 'published';
};

Post.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

/**
  Relationships
  =============
*/

Post.relationship({
  path: 'comments',
  ref: 'PostComment',
  refPath: 'comment'
});

Post.schema.pre('save', function(next) {
  if (this.isModified('state') && this.isPublished() && !this.publishedDate) {
    this.publishedDate = new Date();
  };

  next();
});

Post.track = true;

Post.defaultColumns = 'title, state|20%, author, publishedDate|20%';

Post.register();
