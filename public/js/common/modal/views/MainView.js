define(function(require) {
  var Backbone = require('Backbone');
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  var ModalView = Backbone.View.extend({
    events: {
      'click div.close-button': 'closeDialog'
    }
    template: require('../templates/ModalView'),
    
    className: 'modal-view',

    el: "#modal",

    initialize: function() {
      
    },
    
    hideModal: function(){
      this.trigger( "closeModalWindow");

      $(document.body).unbind( "keyup", this.keyup);

      var container = this.modalContainer;
      $(this.modalContainer)
    },
    dismissModal: function() {
      this.hideModal();
    },
    buildTemplate: function(template, data) {
      var templateFunction;
      if (typeof template === 'function') {
        templateFunction = template;
      } else {
        templateFunction = _.template(Backbone.$(template).html());
      }
      return templateFunction(data);
    },

    render: function(options) {
      var data, _ref;
      data = this.serializeData();
      if (!options || _.isEmpty(options)) {
        options = 0;
      }

      if (this.template) {
        this.modalEl.html(this.buildTemplate(this.template, data));
      }
      this.$el.html(this.modalEl);

      if (typeof this.onRender === "function") {
        this.onRender();
      }
      this.delegateModalEvents();

      return this;
    },
    serializeData: function() {
      var data;
      data = {};
      if (this.model) {
        data = _.extend(data, this.model.toJSON());
      }
      if (this.collection) {
        data = _.extend(data, {
          items: this.collection.toJSON()
        });
      }
      return data;
    },
    getOption: function(option) {
      if (!option) {
        return;
      }
      if (this.options && __indexOf.call(this.options, option) >= 0 && (this.options[option] != null)) {
        return this.options[option];
      } else {
        return this[option];
      }
    },
    delegateModalEvents: function() {
      var cancelEl, key, match, selector, trigger, _results;
      this.active = true;
      cancelEl = this.getOption('cancelEl');
      if (cancelEl) {
        this.$el.on('click', cancelEl, this.triggerCancel);
      }
      _results = [];
      for (key in this.views) {
        if (_.isString(key) && key !== 'length') {
          match = key.match(/^(\S+)\s*(.*)$/);
          trigger = match[1];
          selector = match[2];
          _results.push(this.$el.on(trigger, selector, this.views[key], this.triggerView));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    undelegateModalEvents: function() {
      var cancelEl, key, match, selector, submitEl, trigger, _results;
      this.active = false;
      submitEl = this.getOption('submitEl');
      if (submitEl) {
        this.$el.off('click', submitEl, this.triggerSubmit);
      }
      if (cancelEl) {
        this.$el.off('click', cancelEl, this.triggerCancel);
      }
      _results = [];
      for (key in this.views) {
        if (_.isString(key) && key !== 'length') {
          match = key.match(/^(\S+)\s*(.*)$/);
          trigger = match[1];
          selector = match[2];
          _results.push(this.$el.off(trigger, selector, this.views[key], this.triggerView));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },

  });

  return ModalView;
});