import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { RemoveProductModalComponent } from '../remove-product-modal/remove-product-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numTornillos = 100;
  logged = false;

  constructor(private router: Router, private modal: NgbModal) {}

  ngOnInit(): void {
    const login = sessionStorage.getItem('login');
    this.logged = login ? JSON.parse(login) : false;
  }

  receiveLoggedEvent(logged: any) {
    this.logged = logged;
  }

  revisar() {
    if (this.logged) {
      this.router.navigate(['spinner']);
    }

    this.modal.open(AddProductModalComponent, {
      size: 'lg',
      centered: true,
    });
  }
}
