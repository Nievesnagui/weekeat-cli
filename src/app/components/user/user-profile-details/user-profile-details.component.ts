import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/model.interface';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.css']
})
export class UserProfileDetailsComponent implements OnInit {

  oSessionUser: Observable<IUser | null>;

  constructor(
    private oSessionService: SessionService,
    private oUserService: UserService
  ) { 
    this.oSessionUser = this.oSessionService.getSessionUser() as Observable<IUser | null>;
  }

  ngOnInit() {
    this.oSessionUser.subscribe(user => {
      console.log('Role:', user?.role);
    });
  }
}
