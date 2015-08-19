Markers = new Mongo.Collection('markers');

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
