define (require) ->
  Backbone = require("Backbone")
  Email = require("./../models/Email")
  InboxCollection = Backbone.Collection.extend(
    model: Email
    url: "/api/emails"
  )
  InboxCollection

