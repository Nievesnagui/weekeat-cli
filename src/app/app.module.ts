import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { RouterModule } from '@angular/router';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { RegistrerRoutedComponent } from './components/shared/registrer-routed/registrer-routed.component';
import { SessionService } from './service/session.service';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
    LoginRoutedComponent,
    FooterUnroutedComponent,
    RegistrerRoutedComponent,
    LogoutRoutedComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SessionService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
