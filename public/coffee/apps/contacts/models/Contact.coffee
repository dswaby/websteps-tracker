define (require) ->
  Backbone = require("Backbone")
  Contact = Backbone.Model.extend(urlRoot: "/api/contacts")
  Contact

