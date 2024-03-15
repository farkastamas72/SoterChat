import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  authk = getAuth();
  user = this.authk.currentUser;

  constructor(private afAuth: AngularFireAuth, private db:AngularFireDatabase) {
  
  }


updateProfileImage(imageUrl: string): Promise<void> {
  return this.afAuth.currentUser.then((user) => {
    if (user) {
      return user.updateProfile({
        photoURL: imageUrl
      }).then();
    } else {
      return Promise.reject(new Error('User not found'));
    }
  });
}

getCurrentUser() {
  return this.afAuth.currentUser;
}

getCurrentUserImg(){
  return this.afAuth.currentUser.then((user) => {
    if (user) {
      return user.photoURL
    } else {
      return Promise.reject(new Error('Profile picture not found'));
    }
  });
}

pushData(data: any) {
  return this.db.list('profilePic'+this.user.displayName).push(data);
}

}

