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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AdminUserDetailUnroutedComponent } from './components/admin/admin-user-detail-unrouted/admin-user-detail-unrouted.component';
import { AdminUserDetailRoutedComponent } from './components/admin/admin-user-detail-routed/admin-user-detail-routed.component';
import { AdminUserListRoutedComponent } from './components/admin/admin-user-list-routed/admin-user-list-routed.component';
import { AdminUserListUnroutedComponent } from './components/admin/admin-user-list-unrouted/admin-user-list-unrouted.component';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminUserNewRoutedComponent } from './components/admin/admin-user-new-routed/admin-user-new-routed.component';
import { AdminUserFormUnroutedComponent } from './components/admin/admin-user-form-unrouted/admin-user-form-unrouted.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminUserEditRoutedComponent } from './components/admin/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminIngredientListRoutedComponent } from './components/admin/admin-ingredient-list-routed/admin-ingredient-list-routed.component';
import { AdminIngredientListUnroutedComponent } from './components/admin/admin-ingredient-list-unrouted/admin-ingredient-list-unrouted.component';
import { IngredientService } from './service/ingredient.service';
import { AdminIngredientDetailRoutedComponent } from './components/admin/admin-ingredient-detail-routed/admin-ingredient-detail-routed.component';
import { AdminIngredientDetailUnroutedComponent } from './components/admin/admin-ingredient-detail-unrouted/admin-ingredient-detail-unrouted.component';

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

    //Admin Utilities
    AdminUserDetailUnroutedComponent,
    AdminUserDetailRoutedComponent,
    AdminUserListRoutedComponent,
    AdminUserListUnroutedComponent,
    AdminUserNewRoutedComponent,
    AdminUserFormUnroutedComponent,
    AdminUserEditRoutedComponent,
    AdminIngredientListRoutedComponent,
    AdminIngredientListUnroutedComponent,
    AdminIngredientDetailRoutedComponent,
    AdminIngredientDetailUnroutedComponent,

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
    IngredientService,
    UserService,
    RecipeService,
    CryptoService,
    ConfirmationService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
