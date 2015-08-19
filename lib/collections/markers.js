Markers = new Mongo.Collection('markers');

MarkerSchema = new SimpleSchema({
  layerType: {
    type: String
  },
  slide: {
    type: String
  },
  user: {
    type: String
  },
  options: {
    type: Object
  },
  latlng: {
    type: Object
  },
  radius: {
    type: Number,
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

if (Meteor.isServer) {
  Markers.allow({
    insert: function(userId, doc) {
      return userId;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return userId;
    },

    remove: function(userId, doc) {
      return userId;
    }
  });

  Markers.deny({
    insert: function(userId, doc) {
      return !userId;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return !userId;
    },

    remove: function(userId, doc) {
      return !userId;
    }
  });
}
