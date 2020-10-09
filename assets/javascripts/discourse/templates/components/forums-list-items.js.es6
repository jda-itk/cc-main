export default Ember.Component.extend({
    didInsertElement() {
      this._super();
      this.element.animate({ backgroundColor: "yellow" }, 2000);
    },
  
    willDestroyElement() {
      this._super();
      this.element.stop();
    }
});