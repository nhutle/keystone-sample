var keystone = require('keystone'),
  Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
  label: 'Category',
  singular: 'category',
  plural: 'categories',
  search: 'name'
});

PostCategory.add({
  name: {
    type: String,
    required: true,
    initial: true
  }
});

PostCategory.relationship({
  path: 'posts',
  ref: 'Post',
  refPath: 'categories'
});

PostCategory.relationship({
  path: 'galleries',
  ref: 'Gallery',
  refPath: 'categories'
});

PostCategory.track = true;

PostCategory.register();
