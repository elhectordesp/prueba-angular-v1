import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss'],
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any) {
    this.params = params;
  }

  btnClickedHandler($event: any) {
    if (this.params.onclick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onclick(this.params);
    }
  }

  refresh(params?: any) {
    return true;
  }
}
