import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Stock } from './stock';

const STOCK_ENDPOINT = 'http://dev.markitondemand.com/MODApis/Api/v2/';
const METHOD_EXTENSION = '/jsonp';
const FIND_STOCK_ENDPOINT = STOCK_ENDPOINT + 'Lookup' + METHOD_EXTENSION;
const INTERACTIVE_CHART_ENDPOINT = STOCK_ENDPOINT + 'InteractiveChart' + METHOD_EXTENSION;

@Injectable()
export class StockService {

  public stocks: FirebaseListObservable<Stock[]>;
  private indexes:string[] = [];
  
  constructor(
    private jsonp:Jsonp,
    private af:AngularFire
  ) { 
    this.stocks = af.database.list('/stocks');
    this.stocks.subscribe(stocks => this.indexes = stocks.map(stock => this.getKey(stock)));
  }
  
  /**
   * Adds the given stock to the watch list. 
   * Returns true if it was added and false if it already existed in the watch list.
   */
  addStock(stock:Stock) {
    if (this.indexes.indexOf(this.getKey(stock)) >= 0) {
      return false;
    }  
        
    this.stocks.push(stock);
    return true;
  }
  
  removeStock(stock:Stock) {
    this.stocks.remove(stock);
  }
  
  // creates a unique id for each stock to avoid duplicates.
  private getKey(stock:Stock):string {
    return stock.exchange + ':' + stock.symbol;
  }
  
  /**
   * Lookup for a stock based on parts of its name/symbol
   */
  findStocks(searchQuery: string): Observable<Stock[]> {
    if (searchQuery.length === 0) {
      return Observable.of([]);
    }

    let search = new URLSearchParams()
    search.set('input', searchQuery);
    search.set('jsoncallback', 'JSONP_CALLBACK');
    
    return this.jsonp
      .get(FIND_STOCK_ENDPOINT, { search })
      .map(res => <any[]>res.json())
      .map(array => { return array.map(
          s => <Stock>{ 'symbol':s.Symbol, 'name':s.Name, 'exchange':s.Exchange }
        ) } 
      )
      .map(array => array.filter(stock => stock.exchange === 'NYSE' || stock.exchange === 'NASDAQ'));
  }
  
  /**
   * Query for data
   */
  interactiveChart(stocks:Stock[]):Observable<any> {
    
    let elements = stocks.map(this.mapStock);
        
    let interactiveChartDataInput = {
        Normalized: false,
        EndDate:    '2015-05-01T00:00:00-00',
        NumberOfDays: 60,
        DataPeriod: 'Day',
        LabelPeriod: 'Week',
        LabelInterval: 1,
        Elements: elements
    };
    
    let search = new URLSearchParams()
    search.set('parameters', JSON.stringify(interactiveChartDataInput));
    search.set('jsoncallback', 'JSONP_CALLBACK');
    
    return this.jsonp
      .get(INTERACTIVE_CHART_ENDPOINT, { search })
      .map(res => <Object>res.json());
  }
  
  /**
   * Creates an element of a stock as input to the interactiveChart API
   */
  private mapStock(stock:Stock):Object {
    return { 
      Symbol: stock.symbol, 
      Type: "price", 
      Params: ['c']       
    };
  } 
}
