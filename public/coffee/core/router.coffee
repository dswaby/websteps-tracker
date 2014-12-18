define (require) ->
  Backbone = require("Backbone")
  viewManager = require("./viewManager")
  Router = Backbone.Router.extend(
    routes:
      "": "home"
      inbox: "inbox"
      "inbox/compose": "inboxCompose"
      contacts: "contacts"
      tasks: "tasks"
      fitbit: "fitbit"

    home: ->
      require("./../apps/home/app").run viewManager
      return

    inbox: ->
      require("./../apps/inbox/app").run viewManager
      return

    inboxCompose: ->
      require("./../apps/inbox/subapps/compose/app").run viewManager
      return

    contacts: ->
      require("./../apps/contacts/app").run viewManager
      return

    tasks: ->
      require("./../apps/tasks/app").run viewManager
      return

    fitbit: ->
      require("./../apps/fitbit/app").run viewManager
      return
  )
  Router

