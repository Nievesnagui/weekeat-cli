import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login-routed',
  templateUrl: './login-routed.component.html',
  styleUrls: ['./login-routed.component.css']
})
export class LoginRoutedComponent implements OnInit {

  loginForm: FormGroup;
  status: HttpErrorResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private oSessionService: SessionService,
    private oRouter: Router,
  ) {
   this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;


      this.oSessionService.login(username, password).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oRouter.navigate(['/home']);
          console.log("bien: ", data);
        },
        error: (error: HttpErrorResponse) => {
          console.log("error: ", error);
          this.status = error;
          this.loginForm.reset();
        }
      });
    }
  }
}
