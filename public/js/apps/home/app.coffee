define (require) ->
  MainView = require("./views/MainView")
  run: (viewManager) ->
    view = new MainView()
    viewManager.show view
    return

