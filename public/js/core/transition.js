define(function (require) {
	var transition = {
		duration: 450,

		apply: function (el, type, callback, duration) {
      duration = duration || this.duration;
			var transitionClass = 'animated ' + type;
			el.addClass(transitionClass);
			setTimeout(callback, this.duration);

		}
	};

	return transition;
});