import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { StocksAppComponent, environment } from './app/';
import { JSONP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(StocksAppComponent, [JSONP_PROVIDERS]);
