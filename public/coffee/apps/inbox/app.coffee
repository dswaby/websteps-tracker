define (require) ->
  EmailsCollection = require("./collections/EmailsCollection")
  MainView = require("./views/MainView")
  run: (viewManager) ->
    emailsCollection = new EmailsCollection()
    emailsCollection.fetch success: (emailsCollection) ->
      view = new MainView(collection: emailsCollection)
      viewManager.show view
      return

    return

