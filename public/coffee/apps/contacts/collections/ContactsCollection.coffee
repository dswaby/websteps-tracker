define (require) ->
  Backbone = require("Backbone")
  Contact = require("./../models/Contact")
  ContactsCollection = Backbone.Collection.extend(
    model: Contact
    url: "/api/contacts"
  )
  ContactsCollection

