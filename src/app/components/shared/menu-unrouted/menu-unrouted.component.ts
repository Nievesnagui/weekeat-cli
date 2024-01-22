import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css'],
})
export class MenuUnroutedComponent implements OnInit {
  isNavbarActive: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
