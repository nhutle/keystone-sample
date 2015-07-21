var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
  searchFields: 'name'
});

Gallery.add({
  name: {
    type: String,
    required: true,
    initial: true,
    note: 'This field is required.'
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  heroImage: {
    type: Types.CloudinaryImage
  },
  images: {
    type: Types.CloudinaryImages
  },
  author: {
    type: Types.Relationship,
    ref: 'User'
  },
  categories: {
    type: Types.Relationship,
    ref: 'PostCategory',
    many: true
  }
});

Gallery.defaultColumns = 'name, publishedDate, heroImage, images';

Gallery.track = true;

Gallery.register();
