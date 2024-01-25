import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
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
import { RecipeListRoutedComponent } from './components/recipe/recipe-list-routed/recipe-list-routed.component';
import { RecipeListUnroutedComponent } from './components/recipe/recipe-list-unrouted/recipe-list-unrouted.component';
import { RecipeDetailRoutedComponent } from './components/recipe/recipe-detail-routed/recipe-detail-routed.component';
import { RecipeService } from './service/recipe.service';
import { PaginatorModule } from 'primeng/paginator';
import { UserProfileDetailsComponent } from './components/user/user-profile-details/user-profile-details.component';
import { CryptoService } from './service/crypto.service';
import { RecipeListOwnRoutedComponent } from './components/recipe/recipe-list-own-routed/recipe-list-own-routed.component';
import { RecipeListOwnUnroutedComponent } from './components/recipe/recipe-list-own-unrouted/recipe-list-own-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,

    //Logs
    RegistrerRoutedComponent,
    LogoutRoutedComponent,
    LoginRoutedComponent,

    //Recipe
    RecipeListRoutedComponent,
    RecipeListUnroutedComponent,
    RecipeDetailRoutedComponent,
    RecipeListOwnRoutedComponent,
    RecipeListOwnUnroutedComponent,

    //User
    UserProfileDetailsComponent,

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    CarouselModule,
  ],
  providers: [
    SessionService,
    UserService,
    RecipeService,
    CryptoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
