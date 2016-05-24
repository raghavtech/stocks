import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';

import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'stocks-chart',
  templateUrl: 'chart.component.html',
  directives: [CHART_DIRECTIVES],
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnChanges, OnInit {
  
  @Input() stocks:Stock[];

  // chart options
  message:string;
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  
  
  constructor(private stockService:StockService) {

  }
  
  ngOnInit() {
      console.warn("on init");
      console.info(this.stocks);
  }
  
  ngOnChanges() {
      console.warn("Change! ");
      console.info(this.stocks);
      this.updateChart();
  }
  
  updateChart() {
    if (this.stocks.length === 0) {
      this.lineChartData = [];
      this.lineChartLabels = [];
      return;
    }

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