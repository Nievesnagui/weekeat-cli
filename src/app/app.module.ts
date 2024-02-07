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
import { AdminIngredientNewRoutedComponent } from './components/admin/admin-ingredient-new-routed/admin-ingredient-new-routed.component';
import { AdminIngredientFormUnroutedComponent } from './components/admin/admin-ingredient-form-unrouted/admin-ingredient-form-unrouted.component';
import { AdminTypeListRoutedComponent } from './components/admin/admin-type-list-routed/admin-type-list-routed.component';
import { AdminTypeListUnroutedComponent } from './components/admin/admin-type-list-unrouted/admin-type-list-unrouted.component';
import { TypeService } from './service/type.service';
import { AdminTypeDetailUnroutedComponent } from './components/admin/admin-type-detail-unrouted/admin-type-detail-unrouted.component';
import { AdminTypeDetailRoutedComponent } from './components/admin/admin-type-detail-routed/admin-type-detail-routed.component';
import { AdminTypeNewRoutedComponent } from './components/admin/admin-type-new-routed/admin-type-new-routed.component';
import { AdminTypeFormUnroutedComponent } from './components/admin/admin-type-form-unrouted/admin-type-form-unrouted.component';
import { AdminTypeEditRoutedComponent } from './components/admin/admin-type-edit-routed/admin-type-edit-routed.component';
import { TypeSelectionUnroutedComponent } from './components/type/type-selection-unrouted/type-selection-unrouted.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminIngredientEditRoutedComponent } from './components/admin/admin-ingredient-edit-routed/admin-ingredient-edit-routed.component';
import { AdminRecipeListRoutedComponent } from './components/admin/admin-recipe-list-routed/admin-recipe-list-routed.component';
import { AdminRecipeListUnroutedComponent } from './components/admin/admin-recipe-list-unrouted/admin-recipe-list-unrouted.component';
import { AdminRecipeDetailRoutedComponent } from './components/admin/admin-recipe-detail-routed/admin-recipe-detail-routed.component';
import { AdminRecipeDetailUnroutedComponent } from './components/admin/admin-recipe-detail-unrouted/admin-recipe-detail-unrouted.component';
import { AdminRecipeEditRoutedComponent } from './components/admin/admin-recipe-edit-routed/admin-recipe-edit-routed.component';
import { AdminRecipeFormUnroutedComponent } from './components/admin/admin-recipe-form-unrouted/admin-recipe-form-unrouted.component';
import { AdminRecipeNewRoutedComponent } from './components/admin/admin-recipe-new-routed/admin-recipe-new-routed.component';
import { UserSelectionUnroutedComponent } from './components/user/user-selection-unrouted/user-selection-unrouted.component';
import { WeeklyNewRoutedComponent } from './components/weekly/weekly-new-routed/weekly-new-routed.component';
import { WeeklyNewUnroutedComponent } from './components/weekly/weekly-new-unrouted/weekly-new-unrouted.component';
import { AdminContentFormUnroutedComponent } from './components/admin/admin-content-form-unrouted/admin-content-form-unrouted.component';
import { AdminContentNewRoutedComponent } from './components/admin/admin-content-new-routed/admin-content-new-routed.component';
import {PickListModule} from 'primeng/picklist';
import { RecipeDetailOwnUnroutedComponent } from './components/recipe/recipe-detail-own-unrouted/recipe-detail-own-unrouted.component';
import { ContentService } from './service/content.service';
import { AdminContentRemoveUnroutedComponent } from './components/admin/admin-content-remove-unrouted/admin-content-remove-unrouted.component';
import { AdminContentRemoveRoutedComponent } from './components/admin/admin-content-remove-routed/admin-content-remove-routed.component';
import { RecipeNewRoutedComponent } from './components/recipe/recipe-new-routed/recipe-new-routed.component';
import { RecipeFormUnroutedComponent } from './components/recipe/recipe-form-unrouted/recipe-form-unrouted.component';
import { RecipeEditRoutedComponent } from './components/recipe/recipe-edit-routed/recipe-edit-routed.component';
import { RecipeContentFormUnroutedComponent } from './components/recipe/recipe-content-form-unrouted/recipe-content-form-unrouted.component';
import { RecipeContentNewRoutedComponent } from './components/recipe/recipe-content-new-routed/recipe-content-new-routed.component';
import { RecipeContentRemoveRoutedComponent } from './components/recipe/recipe-content-remove-routed/recipe-content-remove-routed.component';
import { RecipeContentRemoveUnroutedComponent } from './components/recipe/recipe-content-remove-unrouted/recipe-content-remove-unrouted.component';
import { CalendarModule } from 'primeng/calendar';
import { WeeklyScheduleNewRoutedComponent } from './components/weekly/weekly-schedule-new-routed/weekly-schedule-new-routed.component';
import { WeeklyScheduleFormUnroutedComponent } from './components/weekly/weekly-schedule-form-unrouted/weekly-schedule-form-unrouted.component';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';

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
    RecipeDetailOwnUnroutedComponent,
    RecipeNewRoutedComponent,
    RecipeFormUnroutedComponent,
    RecipeEditRoutedComponent,

    //Content
    RecipeContentFormUnroutedComponent,
    RecipeContentNewRoutedComponent,
    RecipeContentRemoveRoutedComponent,
    RecipeContentRemoveUnroutedComponent,

    //User
    UserSelectionUnroutedComponent,
    UserProfileDetailsComponent,

    //Type
    TypeSelectionUnroutedComponent,

    //Schedule
    WeeklyScheduleNewRoutedComponent,
    WeeklyScheduleFormUnroutedComponent,

    //Weekly
    WeeklyNewRoutedComponent,
    WeeklyNewUnroutedComponent,

    //Admin Utilities
            //User
    AdminUserDetailUnroutedComponent,
    AdminUserDetailRoutedComponent,
    AdminUserListRoutedComponent,
    AdminUserListUnroutedComponent,
    AdminUserNewRoutedComponent,
    AdminUserFormUnroutedComponent,
    AdminUserEditRoutedComponent,
            //Ingredient
    AdminIngredientListRoutedComponent,
    AdminIngredientListUnroutedComponent,
    AdminIngredientDetailRoutedComponent,
    AdminIngredientDetailUnroutedComponent,
    AdminIngredientNewRoutedComponent,
    AdminIngredientFormUnroutedComponent,
    AdminIngredientEditRoutedComponent,
            //Type
    AdminTypeListRoutedComponent,
    AdminTypeListUnroutedComponent,
    AdminTypeDetailUnroutedComponent,
    AdminTypeDetailRoutedComponent,
    AdminTypeNewRoutedComponent,
    AdminTypeFormUnroutedComponent,
    AdminTypeEditRoutedComponent,
            //Recipe
    AdminRecipeListRoutedComponent,
    AdminRecipeListUnroutedComponent,
    AdminRecipeDetailRoutedComponent,
    AdminRecipeDetailUnroutedComponent,
    AdminRecipeEditRoutedComponent,
    AdminRecipeFormUnroutedComponent,
    AdminRecipeNewRoutedComponent,
            //Content
    AdminContentFormUnroutedComponent,
    AdminContentNewRoutedComponent,
    AdminContentRemoveRoutedComponent,
    AdminContentRemoveUnroutedComponent,


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
    BrowserAnimationsModule,
    PickListModule,
    CalendarModule,
    DragDropModule,
    PanelModule,
    SplitterModule,
  ],
  providers: [
    SessionService,
    IngredientService,
    TypeService,
    UserService,
    RecipeService,
    CryptoService,
    ConfirmationService,
    DialogService,
    ContentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
