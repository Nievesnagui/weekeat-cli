import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { RegistrerRoutedComponent } from './components/shared/registrer-routed/registrer-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { RecipeListRoutedComponent } from './components/recipe/recipe-list-routed/recipe-list-routed.component';
import { RecipeDetailRoutedComponent } from './components/recipe/recipe-detail-routed/recipe-detail-routed.component';
import { UserProfileDetailsComponent } from './components/user/user-profile-details/user-profile-details.component';
import { RecipeListOwnRoutedComponent } from './components/recipe/recipe-list-own-routed/recipe-list-own-routed.component';
import { AdminUserDetailRoutedComponent } from './components/admin/admin-user-detail-routed/admin-user-detail-routed.component';
import { AdminUserListRoutedComponent } from './components/admin/admin-user-list-routed/admin-user-list-routed.component';
import { AdminUserNewRoutedComponent } from './components/admin/admin-user-new-routed/admin-user-new-routed.component';
import { AdminUserEditRoutedComponent } from './components/admin/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminIngredientListRoutedComponent } from './components/admin/admin-ingredient-list-routed/admin-ingredient-list-routed.component';
import { AdminIngredientDetailRoutedComponent } from './components/admin/admin-ingredient-detail-routed/admin-ingredient-detail-routed.component';
import { AdminIngredientNewRoutedComponent } from './components/admin/admin-ingredient-new-routed/admin-ingredient-new-routed.component';
import { AdminTypeListRoutedComponent } from './components/admin/admin-type-list-routed/admin-type-list-routed.component';
import { AdminTypeDetailRoutedComponent } from './components/admin/admin-type-detail-routed/admin-type-detail-routed.component';
import { AdminTypeNewRoutedComponent } from './components/admin/admin-type-new-routed/admin-type-new-routed.component';
import { AdminTypeEditRoutedComponent } from './components/admin/admin-type-edit-routed/admin-type-edit-routed.component';
import { AdminIngredientEditRoutedComponent } from './components/admin/admin-ingredient-edit-routed/admin-ingredient-edit-routed.component';
import { AdminRecipeListRoutedComponent } from './components/admin/admin-recipe-list-routed/admin-recipe-list-routed.component';
import { AdminRecipeDetailRoutedComponent } from './components/admin/admin-recipe-detail-routed/admin-recipe-detail-routed.component';
import { AdminRecipeEditRoutedComponent } from './components/admin/admin-recipe-edit-routed/admin-recipe-edit-routed.component';
import { AdminRecipeNewRoutedComponent } from './components/admin/admin-recipe-new-routed/admin-recipe-new-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  
  //Login
  { path: 'login', component: LoginRoutedComponent },
  { path: 'registrer', component: RegistrerRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },

  //Recipe
  { path: 'recipe/list', component: RecipeListRoutedComponent },
  { path: 'recipe/:id', component: RecipeDetailRoutedComponent },
  { path: 'recipe/list/own', component: RecipeListOwnRoutedComponent },

  //User
  { path: 'user/myprofile', component: UserProfileDetailsComponent },

  //Admin Utilities
          //User
  { path: 'admin/user/detail/:id', component: AdminUserDetailRoutedComponent },
  { path: 'admin/user/list', component: AdminUserListRoutedComponent },
  { path: 'admin/user/new', component: AdminUserNewRoutedComponent },
  { path: 'admin/user/edit/:id', component: AdminUserEditRoutedComponent },
          //Ingredient
  { path: 'admin/ingredient/list', component: AdminIngredientListRoutedComponent },
  { path: 'admin/ingredient/detail/:id', component: AdminIngredientDetailRoutedComponent},
  { path: 'admin/ingredient/new', component: AdminIngredientNewRoutedComponent },
  { path: 'admin/ingredient/edit/:id', component: AdminIngredientEditRoutedComponent },
          //Type
  { path: 'admin/type/list', component: AdminTypeListRoutedComponent },
  { path: 'admin/type/detail/:id', component: AdminTypeDetailRoutedComponent },
  { path: 'admin/type/new', component: AdminTypeNewRoutedComponent },
  { path: 'admin/type/edit/:id', component: AdminTypeEditRoutedComponent },
          //Recipe
  { path: 'admin/recipe/list', component: AdminRecipeListRoutedComponent },
  { path: 'admin/recipe/detail/:id', component: AdminRecipeDetailRoutedComponent },
  { path: 'admin/recipe/new', component: AdminRecipeNewRoutedComponent },
  { path: 'admin/recipe/edit/:id', component: AdminRecipeEditRoutedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
