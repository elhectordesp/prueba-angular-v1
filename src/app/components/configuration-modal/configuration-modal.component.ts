import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: './configuration-modal.component.html',
  styleUrls: ['./configuration-modal.component.scss'],
})
export class ConfigurationModalComponent implements OnInit {
  filas: any = [];
  filasIni: any = [];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.filas = this.filasIni;
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
    for (const [index, filaR] of this.filas.entries()) {
      if (filaR.headerName === fila.headerName) {
        filaR.order--;
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
  }

  bajar(i: number, fila: any) {
    for (const [index, filaR] of this.filas.entries()) {
      if (filaR.headerName === fila.headerName) {
        filaR.order++;
        this.filas[index + 1].order--;
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
  }

  // Aquí iría el apartado de fijar pero no sabía exactamente que es lo que tenía que suceder con este botón
}
