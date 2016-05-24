import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { StocksAppComponent, environment } from './app/';
import { JSONP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(StocksAppComponent, [
  JSONP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://ts-stocks.firebaseio.com')
]);
