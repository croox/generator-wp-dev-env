'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wp-dev-env:plugin', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/plugin'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
