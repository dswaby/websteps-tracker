define(function (require) {
	var $ = require('jQuery');
	var transition = require('./transition');

	var viewManager = (function () {
		var currentView;
    var firstPass = true;
		var transitionOutType = $('#app').data('transition-out');
    var transitionInType = $('#app').data('transition-in');
    var defaults = {
      transitionIn: "zoomIn",
      transitionOut: "zoomOut"
    };
		function showView(view) {
      if (view.transition) {
        transitionInType = view.transition.in;
      }
      else {
        transitionInType = defaults.transitionIn;
      }
			disposeView(currentView, function () {
				render(view);
			});
		}

		function disposeView(view, callback) {
      var delay = null;
			if (!view) {
				return callback();
			}
      if (view && view.transition) {
        transitionOutType = view.transition.out || defaults.transitionOut;
      }
			return applyTransition(view.$el, transitionOutType, function () {
        view.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          _disposeView(view);
          return callback();
        });
			});

			function applyTransition(el, name, callback, delay) {
				if (!name) {
					return callback();
				}

				return transition.apply(el, name, callback, delay);
			}

			function _disposeView(view) {
        // removes any nested views
				view.subviews && view.subviews.forEach(function (subview) {
					_disposeView(subview);
				});
        // optional method for custom cleanup
        if (typeof view.onClose == 'function') {
          view.onClose();
        }
				view.remove();
        view.unbind();
			}
		}

		function render(view) {
			currentView = view;
			$("#app").html(currentView.el);
      if (firstPass || !currentView.transition) {
        currentView.render();
        firstPass = false;
      }
      else {
        currentView.$el.addClass("hidden");
        currentView.render();
        transition.apply(currentView.$el, transitionInType, function() {
          currentView.$el.removeClass("hidden");
        });
      }
		}

		return {
			show: showView
		};
	})();

	return viewManager;
});