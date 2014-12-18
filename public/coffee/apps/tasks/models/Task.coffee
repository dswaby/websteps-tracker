define (require) ->
  Backbone = require("Backbone")
  Task = Backbone.Model.extend(urlRoot: "/api/tasks")
  Task

