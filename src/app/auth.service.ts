import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { getAuth, updatePassword, sendEmailVerification } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub=new BehaviorSubject<any>(null)
  
  photo:any
  photoUrlSub= new Subject()
  passSuccess=false;
  


  constructor(private fireauth: AngularFireAuth, private router:Router) { }

  getPhotoURL(){
    return this.photoUrlSub
  }

  login(email:string,password:string){
  this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
    localStorage.setItem('token','true');

    this.router.navigate(['./main-app']);
  
    
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
    console.log("Sikeres Kijelentkezés")
    this.router.navigate(['/login'])
    localStorage.removeItem('token');
  }, err => {
    alert(err.message)
  })
}

forgotPassword(email:string){
this.fireauth.sendPasswordResetEmail(email).then(() => {
  alert("Your password reset request has been processed. We've sent a reset code to your registered email address. Please check your inbox (and spam/junk folder, if necessary) for further instructions.")
}, err =>  {
  alert('Something went wrong!');
  console.log(err);
})
}

getCurrentUserDisplayName(): Observable<string | null> {
  return this.fireauth.authState.pipe(
    map(user => {
      if (user) {
        return user.displayName;
      } else {
        return null;
      }
    })
  );
}

getCurrentUserPhotoURL(): Observable<string | null> {
  return this.fireauth.authState.pipe(
    map(user => {
      if (user) {
        return user.photoURL;
      } else {
        return null;
      }
    })
  );
}

getCurrentUserUId(): Observable<string | null> {
  return this.fireauth.authState.pipe(
    map(user => {
      if (user) {
        return user.uid;
      } else {
        return null;
      }
    })
  );
}

getCurrentUserEmail(): Observable<string | null> {
  return this.fireauth.authState.pipe(
    map(user => {
      if (user) {
        return user.email;
      } else {
        return null;
      }
    })
  );
}

getCurrentUserEmailVerified(): Observable<boolean | null> {
  return this.fireauth.authState.pipe(
    map(user => {
      if (user) {
        return user.emailVerified;
      } else {
        return null;
      }
    })
  );
}

sendVerificationEmail(){
const auth = getAuth();
sendEmailVerification(auth.currentUser)
  .then(() => {
  
  });
}

updatePassword(password:any){
  const auth = getAuth();

const user = auth.currentUser;
const newPassword = password;

updatePassword(user, newPassword).then(() => {
  this.passSuccess=true;
  console.log("Siker!")
}).catch((error) => {
  console.log(error)
  this.passSuccess=false;
}); 
}

}
