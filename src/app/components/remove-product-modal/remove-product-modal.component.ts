import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-product-modal',
  templateUrl: './remove-product-modal.component.html',
  styleUrls: ['./remove-product-modal.component.scss'],
})
export class RemoveProductModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
