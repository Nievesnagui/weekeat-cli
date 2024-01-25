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

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'registrer', component: RegistrerRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent },
  { path: 'recipe/list', component: RecipeListRoutedComponent},
  { path: 'recipe/:id_recipe', component: RecipeDetailRoutedComponent},
  { path: 'user/myprofile', component: UserProfileDetailsComponent },
  { path: 'recipe/list/own', component: RecipeListOwnRoutedComponent},
  { path: 'admin/user/detail/:id', component: AdminUserDetailRoutedComponent},
  { path: 'admin/user/list', component: AdminUserListRoutedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
