'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

exports['default'] = function (gulp, src) {
  gulp.task('lint', function () {
    return gulp.src(src).pipe((0, _gulpEslint2['default'])({
      baseConfig: {
        parser: 'babel-eslint'
      },
      "rules": {
        "strict": [2, "never"],
        "curly": [2, "all"],
        "guard-for-in": 2,
        "no-caller": 2,
        "no-extra-bind": 2,
        "no-multi-spaces": 2,
        "no-redeclare": [2, { "builtinGlobals": true }],
        "indent": [2, 2, { "SwitchCase": 1 }],
        "array-bracket-spacing": 2,
        "brace-style": [2, "1tbs"],
        "camelcase": [2, { "properties": "always" }],
        "comma-spacing": [2, { "before": false, "after": true }],
        "comma-style": 2,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "new-cap": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [2, { "max": 1 }],
        "no-nested-ternary": 2,
        "padded-blocks": [0, "never"],
        "space-before-blocks": [2, "always"],
        "space-before-function-paren": [2, "never"],
        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,
        "arrow-parens": [0, "always"],
        "object-shorthand": [0, "always"],
        "prefer-spread": 2,
        "prefer-template": 0,
        "computed-property-spacing": [2, "never"],
        "consistent-this": [2, "self"],
        "no-spaced-func": 2,
        "semi": [2, "always"],
        "space-after-keywords": [2, "always"],
        "space-return-throw-case": 2,
        "dot-location": [2, "property"]
      }
    })).pipe(_gulpEslint2['default'].format()).pipe(_gulpEslint2['default'].failOnError());
  });
};

;
module.exports = exports['default'];