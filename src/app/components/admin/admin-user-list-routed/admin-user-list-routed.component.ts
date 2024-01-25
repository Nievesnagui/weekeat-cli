import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-user-list-routed',
  templateUrl: './admin-user-list-routed.component.html',
  styleUrls: ['./admin-user-list-routed.component.css']
})
export class AdminUserListRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  
  constructor(
    private oUserService: UserService,
    private oConfirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

}
