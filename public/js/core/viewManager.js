define(function (require) {
	var $ = require('jQuery');
	var transition = require('./transition');

	var viewManager = (function () {
		var currentView;
		var transitionOutType = $('#app').data('transition-out');
    var transitionInType = $('#app').data('transition-in');

		function showView(view) {
			disposeView(currentView, function () {
				render(view);
			});
		}

		function disposeView(view, callback) {
			if (!view) {
				return callback();
			}

			return applyTransition(view.$el, transitionOutType, function () {
				_disposeView(view);
				return callback();
			});

			function applyTransition(el, name, callback) {
				if (!name) {
					return callback();
				}

				return transition.apply(el, name, callback);
			}

			function _disposeView(view) {
				view.subviews && view.subviews.forEach(function (subview) {
					_disposeView(subview);
				});

				view.remove();
        view.unbind();
			}
		}

		function render(view) {
      console.log(view)
			currentView = view;
			$("#app").html(currentView.el);
      currentView.$el.addClass("hidden");
			currentView.render();
      transition.apply(currentView.$el, transitionInType, function() {
        console.log("done");
      });
      currentView.$el.removeClass("hidden");
		}

		return {
			show: showView
		};
	})();

	return viewManager;
});