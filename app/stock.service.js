"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var angularfire2_1 = require('angularfire2');
var STOCK_ENDPOINT = 'http://dev.markitondemand.com/MODApis/Api/v2/';
var METHOD_EXTENSION = '/jsonp';
var FIND_STOCK_ENDPOINT = STOCK_ENDPOINT + 'Lookup' + METHOD_EXTENSION;
var INTERACTIVE_CHART_ENDPOINT = STOCK_ENDPOINT + 'InteractiveChart' + METHOD_EXTENSION;
var StockService = (function () {
    function StockService(jsonp, af) {
        var _this = this;
        this.jsonp = jsonp;
        this.af = af;
        this.indexes = [];
        this.stocks = af.database.list('/stocks');
        this.stocks.subscribe(function (stocks) { return _this.indexes = stocks.map(function (stock) { return _this.getKey(stock); }); });
    }
    /**
     * Adds the given stock to the watch list.
     * Returns true if it was added and false if it already existed in the watch list.
     */
    StockService.prototype.addStock = function (stock) {
        if (this.indexes.indexOf(this.getKey(stock)) >= 0) {
            return false;
        }
        this.stocks.push(stock);
        return true;
    };
    StockService.prototype.removeStock = function (stock) {
        this.stocks.remove(stock);
    };
    // creates a unique id for each stock to avoid duplicates.
    StockService.prototype.getKey = function (stock) {
        return stock.exchange + ':' + stock.symbol;
    };
    /**
     * Lookup for a stock based on parts of its name/symbol
     */
    StockService.prototype.findStocks = function (searchQuery) {
        if (searchQuery.length === 0) {
            return Observable_1.Observable.of([]);
        }
        var search = new http_1.URLSearchParams();
        search.set('input', searchQuery);
        search.set('jsoncallback', 'JSONP_CALLBACK');
        return this.jsonp
            .get(FIND_STOCK_ENDPOINT, { search: search })
            .map(function (res) { return res.json(); })
            .map(function (array) {
            return array.map(function (s) { return { 'symbol': s.Symbol, 'name': s.Name, 'exchange': s.Exchange }; });
        })
            .map(function (array) { return array.filter(function (stock) { return stock.exchange === 'NYSE' || stock.exchange === 'NASDAQ'; }); });
    };
    /**
     * Query for data
     */
    StockService.prototype.interactiveChart = function (stocks) {
        var elements = stocks.map(this.mapStock);
        var interactiveChartDataInput = {
            Normalized: false,
            EndDate: '2015-05-01T00:00:00-00',
            NumberOfDays: 60,
            DataPeriod: 'Day',
            LabelPeriod: 'Week',
            LabelInterval: 1,
            Elements: elements
        };
        var search = new http_1.URLSearchParams();
        search.set('parameters', JSON.stringify(interactiveChartDataInput));
        search.set('jsoncallback', 'JSONP_CALLBACK');
        return this.jsonp
            .get(INTERACTIVE_CHART_ENDPOINT, { search: search })
            .map(function (res) { return res.json(); });
    };
    /**
     * Creates an element of a stock as input to the interactiveChart API
     */
    StockService.prototype.mapStock = function (stock) {
        return {
            Symbol: stock.symbol,
            Type: "price",
            Params: ['c']
        };
    };
    StockService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, angularfire2_1.AngularFire])
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map