define (require) ->
  MainView = require("./views/MainView")
  Email = require("./../../models/Email")
  run: (viewManager) ->
    email = new Email()
    mainView = new MainView(model: email)
    viewManager.show mainView
    return

