var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
  label: 'Post',
  singular: 'post',
  plural: 'posts',
  searchFields: 'name, state'
});

Post.add({
  name: {
    type: String,
    required: true,
    initial: true,
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft'
  },
  author: {
    type: Types.Relationship,
    ref: 'User'
  },
  publishedDate: {
    type: Types.Date
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
  },
  image: {
    type: Types.CloudinaryImage,
    publicID: 'slug',
    folder: 'keystone/images'
  }
});

Post.schema.methods.isPublished = function() {
  return this.state === 'published';
};

Post.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Post.relationship({
  path: 'postComments',
  ref: 'PostComment',
  refPath: 'post'
});

Post.schema.pre('save', function(next) {
  if (this.isModified('state') && this.isPublished() && !this.publishedDate) {
    this.publishedDate = new Date();
  };

  next();
});

Post.track = true;

Post.defaultColumns = 'title, image, state|20%, author, publishedDate|20%';

Post.register();
