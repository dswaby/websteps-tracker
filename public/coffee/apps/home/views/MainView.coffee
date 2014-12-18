define (require) ->
  Backbone = require("Backbone")
  HeaderView = require("./HeaderView")
  FooterView = require("./FooterView")
  MainView = Backbone.View.extend(
    initialize: ->
      @subviews = []
      return

    render: ->
      headerView = new HeaderView()
      @subviews.push headerView
      @$el.append headerView.render().el
      footerView = new FooterView()
      @subviews.push footerView
      @$el.append footerView.render().el
      this
  )
  MainView

