import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainAppComponent } from './main-app/main-app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'profile', component:ProfileComponent},
  {path:'main-app', component:MainAppComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},

  {path: '', component:LoginComponent},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
