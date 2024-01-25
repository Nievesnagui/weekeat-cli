import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-logout-routed',
  templateUrl: './logout-routed.component.html',
  styleUrls: ['./logout-routed.component.css']
})
export class LogoutRoutedComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private oSessionService: SessionService,
    private oRouter: Router,
  ) {
   
   }

  ngOnInit() {
  }

   logout() {
    this.oSessionService.logout();
     this.oSessionService.emit({ type: 'logout' });
     this.oRouter.navigate(['/']);
   }
 
   cancel() {
     this.oRouter.navigate(['/']);
   }

}
