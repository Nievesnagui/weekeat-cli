import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
  }
}
