import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainAppComponent } from './main-app/main-app.component';
import { ProfileComponent } from './profile/profile.component';
import { UsernameComponent } from './username/username.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'profile', component:ProfileComponent},
  {path:'main-app', component:MainAppComponent},
  {path:'username', component:UsernameComponent},

  //forgot password
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'verify-email', component:VerifyEmailComponent},


  {path: '', component:LoginComponent},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
