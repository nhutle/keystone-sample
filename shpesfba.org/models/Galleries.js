var keystone = require('keystone'),
  Type = keystone.Field.Types;

/**
 * Gallery Model
 */
var Gallery = new keystone.List('Gallery', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
});

Gallery.add({
  name: {
    type: String,
    require: true
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
  }
});

/**
 * Registration
 */
Gallery.defaultColumns = 'name, publishedDate, heroImage, images';
Gallery.register();
