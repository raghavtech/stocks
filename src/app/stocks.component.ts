import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  providers: [StockService]
})
export class StocksAppComponent {
  
  // search control and results from the search
  private searchStock = new Control();
  private searchStockResults:Stock[] = [];
  
  // stocks to visualize
  private stocks:Stock[] = [];
  
  constructor(private stockService:StockService) {
    this.searchStock
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.stockService.findStocks(query))
      .subscribe(r => this.searchStockResults = r);
  }
  
  addStock(stock:Stock):void {
    // don't add if it's already in the list
    if (this.stocks.indexOf(stock) >= 0)
      return;
    // remove item from the search results
    this.removeFromStockArray(stock, this.searchStockResults);
    this.stocks.push(stock);    
  }
  
  removeStock(stock: Stock):void {
    this.removeFromStockArray(stock, this.stocks);
  }

  /**
   * Removes a stock from a given stock array
   */
  removeFromStockArray(stock: Stock, array:Stock[]):void {
    if (array.indexOf(stock) < 0)
      return;
    array.splice(array.indexOf(stock), 1);
  }

  updateChart() {
    console.log("Updating chart");
    // this.stockService.interactiveChart(this.stocks);
  }
}
