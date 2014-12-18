define (require) ->
  transition =
    duration: 700
    apply: (el, type, callback) ->
      transitionClass = "animated " + type
      el.addClass transitionClass
      setTimeout callback, @duration
      return

  transition

