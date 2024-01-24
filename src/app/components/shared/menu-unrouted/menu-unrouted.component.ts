import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IUser, SessionEvent } from 'src/app/model/model.interface';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css'],
})
export class MenuUnroutedComponent implements OnInit {
  
  isNavbarActive: boolean = false;
  strUserName: string = "";
  oSessionUser: IUser | null = null;
  strUrl: string = "";

  constructor(
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router
  ) {
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

    this.strUserName = oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUserName = this.oSessionService.getUsername();
          this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oUser: IUser) => {
              this.oSessionUser = oUser;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.strUserName = "";
        }
      }
    });
  }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
