define (require) ->
  $ = require("jQuery")
  Backbone = require("Backbone")
  setup: (win, app) ->
    $(win.document).on "click", "a[href]:not([data-bypass])", (evt) ->
      href =
        prop: $(this).prop("href")
        attr: $(this).attr("href")

      root = win.location.protocol + "//" + win.location.host + app.root
      if href.prop.slice(0, root.length) is root
        evt.preventDefault()
        Backbone.history.navigate href.attr, true
      return

    return

