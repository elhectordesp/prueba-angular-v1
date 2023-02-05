import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numTornillos = 100;
  logged = false;

  constructor(private router: Router) {}

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
  }
}
