define (require) ->
  Backbone = require("Backbone")
  Picture = require("./../models/Picture")
  PicturesCollection = Backbone.Collection.extend(
    model: Picture
    url: "/api/fitbit"
  )
  PicturesCollection

