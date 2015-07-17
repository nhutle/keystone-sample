var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
  autokey: {
    from: 'name',
    path: 'key'
  }
});

Gallery.add({
  name: {
    type: String,
    required: true,
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
  }
});

Gallery.defaultColumns = 'name, publishedDate, heroImage, images';

Gallery.track = true;

Gallery.register();
