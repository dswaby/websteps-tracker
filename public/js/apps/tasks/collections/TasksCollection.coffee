define (require) ->
  Backbone = require("Backbone")
  Task = require("./../models/Task")
  ContactsCollection = Backbone.Collection.extend(
    model: Task
    url: "/api/tasks"
  )
  ContactsCollection

