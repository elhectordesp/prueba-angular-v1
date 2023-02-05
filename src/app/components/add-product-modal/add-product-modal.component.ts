import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  product: Product = new Product();
  newProductForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    format: ['', Validators.required],
    brand: ['', Validators.required],
  });
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  changePrice(less: boolean) {
    if (less) {
      this.product.price =
        this.product.price > 0
          ? Math.round((this.product.price - 0.1) * 100) / 100
          : 0;
    } else {
      this.product.price = Math.round((this.product.price + 0.1) * 100) / 100;
    }
  }

  submitForm() {
    if (this.newProductForm.valid) {
      this.activeModal.close({
        name: this.newProductForm.controls.name.value,
        price: this.newProductForm.controls.price.value,
        format: this.newProductForm.controls.format.value,
        brand: this.newProductForm.controls.brand.value,
      });
    }
  }
}
