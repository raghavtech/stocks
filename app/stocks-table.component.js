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
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
/**
 * Renders a table with stocks where the first column is an action
 */
var StocksTableAppComponent = (function () {
    function StocksTableAppComponent() {
        // fires an event if the user clicks on the action column. The event object is the stock.
        this.actionClicked = new core_1.EventEmitter();
    }
    StocksTableAppComponent.prototype.onClick = function (stock) {
        this.actionClicked.emit(stock);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], StocksTableAppComponent.prototype, "stocks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StocksTableAppComponent.prototype, "buttonType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StocksTableAppComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StocksTableAppComponent.prototype, "actionClicked", void 0);
    StocksTableAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stocks-table',
            templateUrl: 'stocks-table.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], StocksTableAppComponent);
    return StocksTableAppComponent;
}());
exports.StocksTableAppComponent = StocksTableAppComponent;
//# sourceMappingURL=stocks-table.component.js.map