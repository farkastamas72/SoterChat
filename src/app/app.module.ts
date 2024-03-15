import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

//Environments.ts
  import { Environments } from './environments';

//Firebase
   import { AngularFireModule } from '@angular/fire/compat';
  import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

//Firebase Auth
  import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { SignUpComponent } from './sign-up/sign-up.component';
import { MainAppComponent } from './main-app/main-app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MainAppComponent,
    ProfileComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    

   AngularFireDatabaseModule,
   AngularFireModule.initializeApp(Environments.firebaseConfig),
   AngularFireStorageModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
