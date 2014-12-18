define (require) ->
  TasksCollection = require("./collections/TasksCollection")
  MainView = require("./views/MainView")
  run: (viewManager) ->
    tasksCollection = new TasksCollection()
    tasksCollection.fetch success: (tasksCollection) ->
      view = new MainView(collection: tasksCollection)
      viewManager.show view
      return

    return

