import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'stocks-app',
  templateUrl: 'stocks.component.html',
  directives: [CHART_DIRECTIVES],
  styleUrls: ['stocks.component.css'],
  providers: [StockService]
})
export class StocksAppComponent {
  
  // chart options
  message:string;
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = []
  public lineChartOptions:any = {
    // animation: false,
    // responsive: true
  };
  
  // search control and results from the search
  private searchStock = new Control();
  private searchStockResults:Stock[] = [];
  private queryUnderway:boolean = false;
  
  // stocks to visualize
  private stocks:Stock[] = [];
  
  constructor(private stockService:StockService) {
    console.log(CHART_DIRECTIVES);
    console.log(Observable);
    this.searchStock
      .valueChanges
      .map(e => { this.queryUnderway = true; return e })
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.stockService.findStocks(query))
      .subscribe(r => { this.queryUnderway = false; this.searchStockResults = r });
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
    if (this.stocks.length === 0)
      return;
    console.log("Updating chart");
    this.stockService.interactiveChart(this.stocks)
      .subscribe(data => {
        // console.log(data);
        
        // sometimes the web service does not have data on the stocks
        if (data.Elements.length === 0) {
          console.warn("no data available");
          this.message = 'Unfortunately, the webservice does not have data on the stocks you selected.';
          return;
        }
        
        // if we get data, format it to the required chart.js format
        this.message = null;
        this.lineChartLabels = data.Dates.map(dateString => dateString.substring(0,10));
        this.lineChartData = data.Elements.map(singleStock => this.mapSingleStockData(singleStock));
      }, 
      error => {
        this.message = "An error occured retrieving the stock data: " + JSON.stringify(error);
      });
  }
  
  private mapSingleStockData(data) {
    return {
      data: data.DataSeries.close.values,
      label: data.Symbol,
      fill: false
    }
    
  }
}
