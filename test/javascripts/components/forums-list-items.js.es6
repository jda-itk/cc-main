import componentTest from 'helpers/component-test';

moduleForComponent('forums-list-items', {integration: true});

componentTest('test the rendering', {
  template: '{{forums-list-items forums=testForums}}',

  setup() {
    this.set('testForums', {
        name: 'Sample Data',
        slug: 'sample-slug'
    });
  },

  test(assert) {
    assert.equal(this.$('.category-name h1').text(), 'Sample Data');
    assert.equal(this.$('.category-slug p').text(), 'sample-slug');
  }
});