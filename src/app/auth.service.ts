import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router:Router) { }

  //login
  login(email:string,password:string){
  this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
    localStorage.setItem('token','true');

    if(res.user?.emailVerified==true) {
      this.router.navigate(['./main-app']);
    }
    else {
      this.router.navigate(['./verify-email']);
    }
    
  }, err => {
    alert(err.message)
    this.router.navigate(['./login'])
  })
}

register(email:string,password:string){
  this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
    alert("Sikeres regisztráció!");
    this.router.navigate(['./login']);
  }, err => {
    alert(err.message)
  })
}

logout() {
  this.fireauth.signOut().then( () => {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }, err => {
    alert(err.message)
  })
}

//forgot password
forgotPassword(email:string){
this.fireauth.sendPasswordResetEmail(email).then(() => {
}, err =>  {
  alert('Something went wrong!');
  console.log(err);
})
}

}
