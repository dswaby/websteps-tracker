define (require) ->
  ContactsCollection = require("./collections/ContactsCollection")
  MainView = require("./views/MainView")
  run: (viewManager) ->
    contactsCollection = new ContactsCollection()
    contactsCollection.fetch success: (contactsCollection) ->
      view = new MainView(collection: contactsCollection)
      viewManager.show view
      return

    return

