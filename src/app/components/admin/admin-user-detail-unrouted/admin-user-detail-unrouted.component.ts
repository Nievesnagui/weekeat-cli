import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/model.interface';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-user-detail-unrouted',
  templateUrl: './admin-user-detail-unrouted.component.html',
  styleUrls: ['./admin-user-detail-unrouted.component.css']
})
export class AdminUserDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oUser: IUser = {} as IUser;
  status: HttpErrorResponse | null = null;

  constructor(
    private oUserService: UserService,
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oUserService.getOne(this.id).subscribe({    
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
