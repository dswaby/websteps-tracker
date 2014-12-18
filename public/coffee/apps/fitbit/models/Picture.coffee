define (require) ->
  Backbone = require("Backbone")
  Picture = Backbone.Model.extend(urlRoot: "/api/fitbit")
  Picture

