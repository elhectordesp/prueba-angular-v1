import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: './configuration-modal.component.html',
  styleUrls: ['./configuration-modal.component.scss'],
})
export class ConfigurationModalComponent implements OnInit {
  filas: any = [];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.filas);
    let contador = 1;
    for (let it of this.filas) {
      it.order = contador;
      contador++;
    }
    this.filas.pop();
  }

  ocultar(row: number) {
    switch (row) {
      case 2:
        this.filas[1].hide = !this.filas[1].hide;
        break;
      case 3:
        this.filas[2].hide = !this.filas[2].hide;
        break;
      case 4:
        this.filas[3].hide = !this.filas[3].hide;
        break;
      default:
        this.filas[0].hide = !this.filas[0].hide;
        break;
    }
  }

  aplicar() {
    this.activeModal.close(this.filas);
  }

  subir(i: number, fila: any) {
    console.log(fila);
    for (const [index, filaR] of this.filas.entries()) {
      if (filaR.headerName === fila.headerName) {
        console.log(filaR);
        filaR.order--;
        console.log(this.filas);
        console.log(index);
        this.filas[index - 1].order++;
      }
    }
    this.filas.sort(function (a: { order: number }, b: { order: number }) {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    console.log(this.filas);
  }

  bajar(i: number, fila: any) {}
}
