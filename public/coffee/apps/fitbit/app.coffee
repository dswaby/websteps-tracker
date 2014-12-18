define (require) ->
  PicturesCollection = require("./collections/PicturesCollection")
  MainView = require("./views/MainView")
  run: (viewManager) ->
    picturesCollection = new PicturesCollection()
    picturesCollection.fetch success: (picturesCollection) ->
      view = new MainView(collection: picturesCollection)
      viewManager.show view
      return

    return

