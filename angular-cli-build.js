/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      // angular and its dependencies
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      // ng2-charts
      'chart.js/dist/Chart.bundle.min.js',
      'ng2-charts/**/*.js',
      // firebase
      'angularfire2/**/*.js',
      'firebase/lib/*.js'      
    ]
  });
};
