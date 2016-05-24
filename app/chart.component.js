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
var stock_service_1 = require('./stock.service');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var ChartComponent = (function () {
    function ChartComponent(stockService) {
        this.stockService = stockService;
        this.lineChartData = [];
        this.lineChartLabels = [];
    }
    ChartComponent.prototype.ngOnChanges = function () {
        this.updateChart();
    };
    ChartComponent.prototype.updateChart = function () {
        var _this = this;
        // Don't query if we have no stocks.
        if (this.stocks.length === 0) {
            this.lineChartData = [];
            this.lineChartLabels = [];
            return;
        }
        this.stockService.interactiveChart(this.stocks)
            .subscribe(function (data) {
            // console.log(data);
            // sometimes the web service does not have data on the stocks
            if (data.Elements.length === 0) {
                console.warn("no data available");
                _this.message = 'Unfortunately, the webservice does not have data on the stocks you selected.';
                return;
            }
            // if we get data, format it to the required chart.js format
            _this.message = null;
            _this.lineChartLabels = data.Dates.map(function (dateString) { return dateString.substring(0, 10); });
            _this.lineChartData = data.Elements.map(function (singleStock) { return _this.mapSingleStockData(singleStock); });
        }, function (error) {
            _this.message = "An error occured retrieving the stock data: " + JSON.stringify(error);
        });
    };
    /**
     * Maps data of a single stock from the format retrieved by the web service to the
     * format required by chart.js
     */
    ChartComponent.prototype.mapSingleStockData = function (data) {
        return {
            data: data.DataSeries.close.values,
            label: data.Symbol,
            fill: false
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartComponent.prototype, "stocks", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stocks-chart',
            templateUrl: 'chart.component.html',
            directives: [ng2_charts_1.CHART_DIRECTIVES],
            styleUrls: ['chart.component.css']
        }), 
        __metadata('design:paramtypes', [stock_service_1.StockService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map