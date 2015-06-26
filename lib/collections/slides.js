Slides = new Mongo.Collection('slides');

SlideSchema = new SimpleSchema({
  title: {
    type: String
  },
  patient: {
    type: Object
  },
  'patient.age': {
    type: Number
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
  createdAt: {
    type: Date,
    label: 'Date',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Slides.attachSchema(SlideSchema);

if (Meteor.isServer) {
  Slides.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Slides.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
