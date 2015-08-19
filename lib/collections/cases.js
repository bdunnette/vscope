Cases = new Mongo.Collection('cases');

CaseSchema = new SimpleSchema({
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
  slides: {
    type: [String],
    optional: true
  }
})

Cases.attachSchema(CaseSchema);

Cases.initEasySearch('title');

if (Meteor.isServer) {
  Cases.allow({
    insert: function(userId, doc) {
      return false;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function(userId, doc) {
      return false;
    }
  });

  Cases.deny({
    insert: function(userId, doc) {
      return true;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function(userId, doc) {
      return true;
    }
  });
}
