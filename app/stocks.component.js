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
var common_1 = require('@angular/common');
var stock_service_1 = require('./stock.service');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var chart_component_1 = require('./chart.component');
var stocks_table_component_1 = require('./stocks-table.component');
var StocksAppComponent = (function () {
    function StocksAppComponent(stockService) {
        var _this = this;
        this.stockService = stockService;
        // search control and results from the search
        this.searchStock = new common_1.Control();
        this.searchStockResults = [];
        this.queryUnderway = false;
        // stocks to visualize
        this.stocks = [];
        // bind search control to results
        this.searchStock
            .valueChanges
            .map(function (e) { _this.queryUnderway = true; return e; })
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(function (query) { return _this.stockService.findStocks(query); })
            .subscribe(function (r) { _this.queryUnderway = false; _this.searchStockResults = r; });
        // bind stocks to service
        this.stockService.stocks.subscribe(function (stocks) { return _this.stocks = stocks; });
    }
    StocksAppComponent.prototype.addStock = function (stock) {
        var added = this.stockService.addStock(stock);
        if (!added) {
            this.setMessage('You are already following the stock ' + stock.name);
        }
        else {
            this.setMessage('Stock ' + stock.name + ' added to the watch list');
        }
        this.searchStock.updateValue("");
    };
    StocksAppComponent.prototype.removeStock = function (stock) {
        this.stockService.removeStock(stock);
        this.setMessage('Removed stock ' + stock.name + ' from the watch list');
    };
    // sets info messages and removes it after 5 seconds.
    StocksAppComponent.prototype.setMessage = function (message) {
        var _this = this;
        this.message = message;
        setTimeout(function () { return _this.message = null; }, 5000);
    };
    StocksAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stocks-app',
            templateUrl: 'stocks.component.html',
            directives: [chart_component_1.ChartComponent, stocks_table_component_1.StocksTableAppComponent],
            providers: [stock_service_1.StockService]
        }), 
        __metadata('design:paramtypes', [stock_service_1.StockService])
    ], StocksAppComponent);
    return StocksAppComponent;
}());
exports.StocksAppComponent = StocksAppComponent;
//# sourceMappingURL=stocks.component.js.map