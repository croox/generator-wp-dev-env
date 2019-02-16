'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wp-dev-env:theme', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/theme'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
