Slides = new Mongo.Collection('slides');

SlideSchema = new SimpleSchema({
  title: {
    type: String
  },
  patient: {
    type: Object,
    optional: true
  },
  'patient.age': {
    type: Number,
    optional: true
  },
  'patient.sex': {
    type: String,
    allowedValues: ['M', 'F'],
    optional: true
  },
  slideUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  contributors: {
    type: [String],
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'Date',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Slides.attachSchema(SlideSchema);

Slides.initEasySearch('title');

if (Meteor.isServer) {
  Slides.allow({
    insert: function (userId, doc) {
      return userId;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return userId;
    },

    remove: function (userId, doc) {
      return userId;
    }
  });

  Slides.deny({
    insert: function (userId, doc) {
      return !userId;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return !userId;
    },

    remove: function (userId, doc) {
      return !userId;
    }
  });
}
