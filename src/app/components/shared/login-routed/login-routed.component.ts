import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CryptoService } from 'src/app/service/crypto.service';

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
    private oCryptoService: CryptoService,
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
      const hashedPassword = this.oCryptoService.getSHA256(this.loginForm.value.password);


      this.oSessionService.login(username, hashedPassword).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oRouter.navigate(['']);
        },
        error: (error: HttpErrorResponse) => {
          console.log("error: ", error);
          this.status = error;
          this.loginForm.reset();
        }
      });
    }
  }

  onReset() {
    this.loginForm.reset();
  }

  loginAdmin() {
    this.loginForm.setValue({
      username: 'administrador',
      password: 'weekeat'
    })
  }

  loginUser() {
    this.loginForm.setValue({
      username: 'prueba3',
      password: 'weekeat'
    })
  }
}
