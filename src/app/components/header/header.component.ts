import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() loggedEventEmitter = new EventEmitter<boolean>();
  logged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const login = sessionStorage.getItem('login');
    this.logged = login ? JSON.parse(login) : false;
  }

  login() {
    this.logged = !this.logged;
    sessionStorage.setItem('login', this.logged.toString());
    this.loggedEventEmitter.emit(this.logged);
    if (!this.logged) {
      this.router.navigate(['home']);
    }
  }
}
