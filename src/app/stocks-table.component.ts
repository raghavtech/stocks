import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Control } from '@angular/common';
import { StockService} from './stock.service';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { ChartComponent } from './chart.component';

/**
 * Renders a table with stocks where the first column is an action
 */
@Component({
  moduleId: module.id,
  selector: 'stocks-table',
  templateUrl: 'stocks-table.component.html',
})
export class StocksTableAppComponent {
  
  // stocks to visualize
  @Input() stocks:Stock[];
  
  // bootstrap button color used for the action, e.g., 'danger' or 'success'
  @Input() buttonType:string;
  
  // glyphicon to use - e.g. 'remove' will generate a 'glyphicon-remove'
  @Input() icon:string;
  
  // fires an event if the user clicks on the action column. The event object is the stock.
  @Output() actionClicked = new EventEmitter();
  
  onClick(stock: Stock):void {
      this.actionClicked.emit(stock);
  }  
}
