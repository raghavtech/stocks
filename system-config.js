/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    'chartjs': 'vendor/chart.js/',
    'ng2-charts': 'vendor/ng2-charts',
    'firebase': 'vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'vendor/angularfire2'
};
/** User packages configuration. */
var packages = {
    'chartjs': {
        format: 'global',
        defaultExtension: 'js',
        main: 'dist/Chart.bundle.js'
    },
    'ng2-charts': {
        main: 'bundles/ng2-charts.min.js'
    },
    'angularfire2': {
        defaultExtension: 'js',
        main: 'angularfire2.js'
    }
};
// const map: any = {
//     firebase: 'vendor/firebase/lib/firebase-web.js',
//     angularfire2: 'vendor/angularfire2'
// };
// /** User packages configuration. */
// const packages: any = {
//      angularfire2: {
//       defaultExtension: 'js',
//       main: 'angularfire2.js'
//     }
// };
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map