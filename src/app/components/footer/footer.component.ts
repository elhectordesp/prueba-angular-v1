import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Output() createEventEmitter = new EventEmitter<any>();
  constructor(private modalService: NgbModal) {}

  openNewProduct() {
    const modal = this.modalService.open(AddProductModalComponent, {
      centered: true,
    });

    modal.result.then(
      (result: any) => {
        this.createEventEmitter.emit(result);
      },
      (error) => {}
    );
  }
}
