import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { RegistrerRoutedComponent } from './components/shared/registrer-routed/registrer-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';

const routes: Routes = [
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'registrer', component: RegistrerRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
