import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';

import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import 'chartjs';
declare let Chart;

@Component({
  moduleId: module.id,
  selector: 'stocks-chart',
  templateUrl: 'chart.component.html',
  directives: [CHART_DIRECTIVES],
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnChanges {
  
  @Input() stocks:Stock[];

  // chart options
  message:string;
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  
  
  constructor(private stockService:StockService) { }
  
  ngOnChanges() {
      this.updateChart();
  }
  
  updateChart() {
    // Don't query if we have no stocks.
    if (this.stocks.length === 0) {
      this.lineChartData = [];
      this.lineChartLabels = [];
      return;
    }

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
  
  /**
   * Maps data of a single stock from the format retrieved by the web service to the
   * format required by chart.js
   */
  private mapSingleStockData(data) {
    return {
      data: data.DataSeries.close.values,
      label: data.Symbol,
      fill: false
    }
  }
}
