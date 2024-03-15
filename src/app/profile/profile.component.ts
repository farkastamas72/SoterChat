import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import {getAuth, updateProfile} from 'firebase/auth';
import { ProfileService } from '../profile.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  photoUrl="https://firebasestorage.googleapis.com/v0/b/soterchat-app.appspot.com/o/logo%2F3135789.png?alt=media&token=c4ae5b4f-05b1-48b1-883f-149f14f017d3";
  imageUrl: string;

  typedEmail:string;

  message: string;
  pwDMessage: string;
  pwSMessage: string;
  
  editEmail=false;
  editPassword=false;
  editName=false;

  savedUserName:any;

  newPassword:any;

  currentUserDisplayName: string | null = null;
  currentUserUId: string | null = null;
  userProfilePicture: string | null = null;
  currentUserEmail: string | null = null;
  emailVerified: Boolean | null = null;

  constructor(private router:Router, private storage:AngularFireStorage, private userService: ProfileService, private auth:AngularFireAuth, private authService:AuthService){
    


    if(!localStorage.getItem('token')){
      alert("Please sign in first!")
      this.router.navigate(['./login'])
    }
  }


  ngOnInit(): void {
    this.authService.getCurrentUserDisplayName().subscribe(displayName => {
      this.currentUserDisplayName = displayName;
      this.savedUserName = this.currentUserDisplayName;
    });


    this.authService.getCurrentUserPhotoURL().subscribe(photoURL => {
      this.userProfilePicture = photoURL;
    });

    this.authService.getCurrentUserEmail().subscribe(email => {
      this.currentUserEmail = email;
      this.typedEmail = this.currentUserEmail;
    });


    this.authService.getCurrentUserEmailVerified().subscribe(emailVerified => {
      this.emailVerified = emailVerified;
      console.log(this.emailVerified)
    });




  }

  updateDisplayName(){
  const auth = getAuth();
  updateProfile(auth.currentUser, {

    displayName:this.currentUserDisplayName

  }).then(()=>{
    this.message = 'Name changed successfully';
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
    this.editName = false
    this.savedUserName = this.currentUserDisplayName;
    console.log("Profile updated!")
  }).catch((error)=> {
    console.log(error)
  })
}

updatePassword(){

  if(this.newPassword.length >= 6){
    this.authService.updatePassword(this.newPassword)
    this.pwSMessage = 'The password must contain 6 characters!';
    this.pwDMessage = '';
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
    console.log("A jelszó nem elég hosszú")
  }
  else{
    this.pwSMessage = '';
    this.pwDMessage = 'The password must be at least 6 characters long.';
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
    console.log("A jelszó nem elég hosszú")
  }
  
}

reload(){
  window.location.reload()
}

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.uploadImage(file);
  }
}

emailVerificationSend(){
  this.authService.sendVerificationEmail()
}

uploadImage(file: File): void {
  const filePath = "/profiles/"+this.currentUserDisplayName+"/img";
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
        this.userService.updateProfileImage(downloadURL)
          .then(() => {
            console.log('User profile image updated successfully');
            this.photoUrl = downloadURL
            window.location.reload()
          })
          .catch(error => {
            console.error('Error updating user profile image:', error);
          });
      });
    })
  ).subscribe();
}

pushData() {
  const data = this.photoUrl;
  this.userService.pushData(data)
    .then(() => {
      console.log('Data pushed successfully');
    })
    .catch(error => {
      console.error('Error pushing data:', error);
    });
}

showSuccessAlert(): void {
  this.message = 'Operation was successful!';
  setTimeout(() => {
    this.clearAlert();
  }, 3000);
}

clearAlert(): void {
  this.message = '';
  this.pwSMessage= '';
  this.pwDMessage= '';
}

}

