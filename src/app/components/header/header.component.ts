import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;

  ngOnInit(): void {
    const login = sessionStorage.getItem('login');
    this.logged = login ? JSON.parse(login) : false;
  }


  login() {
    sessionStorage.setItem('login', this.logged.toString());
    this.logged = !this.logged;
  }

}
