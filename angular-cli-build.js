/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      // angular and its dependencies
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      // ng2-charts
      'chart.js/dist/Chart.bundle.min.js',
      'ng2-charts/**/*.js',
      // firebase
      'angularfire2/**/*.+(js|js.map)',
      'firebase/lib/*.+(js|js.map)'      
    ]
  });
};
