const autoprefixer = require('autoprefixer');
const short = require('postcss-short');
const flexbugs = require('postcss-flexbugs-fixes');
const cssImport = require('postcss-import');
const nesting = require('postcss-nesting');

module.exports = () => ({
  plugins: [autoprefixer, short, flexbugs, cssImport, nesting],
});
