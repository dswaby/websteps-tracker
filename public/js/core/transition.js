define(function (require) {
  var $ = require('jQuery');
	var transition = {
		apply: function (el, type, callback, duration) {
      callback();
			var transitionClass = 'animated ' + type;
			el.addClass(transitionClass);
		}
	};

	return transition;
});