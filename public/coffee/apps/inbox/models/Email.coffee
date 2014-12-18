define (require) ->
  Backbone = require("Backbone")
  Email = Backbone.Model.extend(urlRoot: "/api/emails")
  Email

