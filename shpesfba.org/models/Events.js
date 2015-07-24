var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Event Model
 */
var Event = new keystone.List('Event', {
  defaultSort: '-startTime'
});

Event.add({
  FBEventName: {
    type: Types.Text,
    require: true,
    initial: true
  },
  description: {
    type: Types.Textarea
  },

  startTime: {
    type: Types.Datetime
  },
  endTime: {
    type: Types.Datetime
  }
});

Event.defaultColumns = 'FBEventName, description, startTime, endTime';

/**
 * Registration
 */
Event.register();
