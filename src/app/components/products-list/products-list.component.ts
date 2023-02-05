import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular/public-api';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community/dist/lib/main';
import { ButtonCellRendererComponent } from '../button-cell-renderer/button-cell-renderer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveProductModalComponent } from '../remove-product-modal/remove-product-modal.component';
import { ConfigurationModalComponent } from '../configuration-modal/configuration-modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  gridApi!: GridApi;
  logged = true;
  rowData: any;
  paginationPageSize = 10;
  frameworkComponents: any;
  api: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Nombre', field: 'name', sortable: true, hide: false },
    { headerName: 'Precio', field: 'price', sortable: true, hide: false },
    { headerName: 'Formato', field: 'format', sortable: true, hide: false },
    { headerName: 'Marca', field: 'brand', sortable: true, hide: false },
    {
      headerName: 'Acciones',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onclick: this.onDeleteButtonClick.bind(this),
        label: 'hola',
      },
    },
  ];

  gridOptions: GridOptions<any> = {
    columnDefs: this.columnDefs,
    onFirstDataRendered: this.onFirstDataRendered,
  };
  contador = 0;

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonCellRendererComponent,
    };
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: any) => {
      this.rowData = products.map((product: any) => {
        this.contador++;
        return {
          id: this.contador,
          name: product.name,
          price: product.price + ' €',
          format: product.format,
          brand: product.brand,
        };
      });
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.api = params.api;
    params.api.sizeColumnsToFit();
  }

  receiveLoggedEvent(logged: any) {
    this.logged = logged;
  }

  deleteProduct(e: any) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.paginationPageSize = Number(value);
  }

  onDeleteButtonClick(params: any) {
    const modal = this.modalService.open(RemoveProductModalComponent, {
      centered: true,
    });
    modal.result.then(
      (result: any) => {
        if (result) {
          this.rowData = this.rowData.filter(
            (row: any) => row.id !== params.data.id
          );
        }
      },
      (error) => {}
    );
  }

  createProduct(event: any) {
    event.id = this.rowData.length + 1;
    this.rowData.push(event);
    this.api.setRowData(this.rowData);
  }

  openConfiguration() {
    const modal = this.modalService.open(ConfigurationModalComponent, {
      centered: true,
      size: 'lg',
    });

    modal.componentInstance.filasIni = this.columnDefs;

    modal.result.then(
      (result: any) => {
        if (result) {
          this.columnDefs = [];
          for (const iterator of result) {
            let objeto = {};
            objeto = iterator;
            this.columnDefs.push(objeto);
          }
          this.columnDefs.push({
            headerName: 'Acciones',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onclick: this.onDeleteButtonClick.bind(this),
              label: 'hola',
            },
          });
          this.gridApi.setColumnDefs(this.columnDefs);
          this.gridApi.sizeColumnsToFit();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
