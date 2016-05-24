import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { ChartComponent } from './chart.component';

@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  directives: [ChartComponent],
  providers: [StockService]
})
export class StocksAppComponent {
  
  // info message
  private message:string;
  
  // search control and results from the search
  private searchStock = new Control();
  private searchStockResults:Stock[] = [];
  private queryUnderway:boolean = false;
  
  // stocks to visualize
  private stocks:Stock[] = [];
  
  constructor(private stockService:StockService) {
    // bind search control to results
    this.searchStock
      .valueChanges
      .map(e => { this.queryUnderway = true; return e })
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.stockService.findStocks(query))
      .subscribe(r => { this.queryUnderway = false; this.searchStockResults = r });
      
      // bind stocks to service
      this.stockService.stocks.subscribe(stocks => this.stocks = stocks);
  }
  
  addStock(stock:Stock):void {
    let added = this.stockService.addStock(stock);
    if (!added) {
      this.setMessage('You are already following the stock ' + stock.name);
    } else {
      this.setMessage('Stock ' + stock.name + ' added to the watch list');
    }
  }
  
  removeStock(stock: Stock):void {
    this.stockService.removeStock(stock); 
    this.setMessage('Removed stock ' + stock.name + ' from the watch list');
  }
  
  // sets info messages and removes it after 5 seconds.
  private setMessage(message:string) {
    this.message = message;
    setTimeout(() => this.message = null, 5000);
  }
}
