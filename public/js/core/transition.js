define(function (require) {
  var $ = require('jQuery');
	var transition = {
		duration: 450,

		apply: function (el, type, callback, duration) {
      // duration = duration || this.duration;
      $(el).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
			var transitionClass = 'animated ' + type;
			el.addClass(transitionClass);
			setTimeout(callback, this.duration);
		}
	};

	return transition;
});