import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
//Nebular
import { NbThemeModule,NbSidebarModule, NbLayoutModule, NbActionsModule, NbIconModule, NbIconLibraries } from '@nebular/theme';
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
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbActionsModule,
    NbIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private iconLibraries: NbIconLibraries) {
    // Registra paquetes de iconos aquí
    this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
}
