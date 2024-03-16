import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import {getAuth} from 'firebase/auth'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent {
photoUrl="https://firebasestorage.googleapis.com/v0/b/soterchat-app.appspot.com/o/logo%2F3135789.png?alt=media&token=c4ae5b4f-05b1-48b1-883f-149f14f017d3";

currentUserDisplayName: string | null = null;
userProfilePicture: string | null = null; 
currentUserUId: string | null = null; 

selectedFile: File 

userName:any;
messages:any;
newMessage:any;
uploadedImg:any;

private isFirstLoad: boolean = true;

deletedMessage:any;
@ViewChild('scrollContainer') scrollContainer: ElementRef;
@ViewChild('messageTextarea') messageTextarea!: ElementRef;

constructor(private base:BaseService, private auth:AuthService, private router:Router,private storage:AngularFireStorage,private userService:ProfileService){


  this.base.getMessages().snapshotChanges().pipe(
    map(
      (ch)=> ch.map(
        (c)=>({key: c.payload.key, ... c.payload.val()})
      )
    )
  ).subscribe(
    (res)=>this.messages=res
    
  )
}

ngAfterViewChecked() {
  if (this.isFirstLoad) {
    setTimeout(() => {
      this.scrollToBottom();
      this.isFirstLoad = false;
    }, 500);
  }

}

scrollToBottom() {
  if (this.scrollContainer && this.scrollContainer.nativeElement) {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}


ngOnInit(): void { 



  this.auth.getCurrentUserPhotoURL().subscribe(photoURL => {
    this.userProfilePicture = photoURL;
  });

  
  this.auth.getCurrentUserUId().subscribe(uId => {
    this.currentUserUId = uId;
  });

    
  this.auth.getCurrentUserDisplayName().subscribe(displayName => {
    this.currentUserDisplayName = displayName;

  if(!localStorage.getItem('token')){
    alert("Kérlek előbb jelentkezz be!")
    this.router.navigate(['./login'])
  } else if (this.currentUserDisplayName === null){
    console.log(this.currentUserDisplayName)
    alert("Kérlek előbb állítsd be a profilod!")
    this.router.navigate(['./profile'])
  }


 
  });

}


addMessage(){
  const auth = getAuth();
  const user = auth.currentUser;

  if(user!==null){
    user.providerData.forEach((profile)=> {
      this.userName = profile.displayName
    })
  }


if (this.newMessage){
  let time = new Date()
  let getTime = time.getHours() + ":" + time.getMinutes()
  let body = {
      user:this.userName,
      time:getTime,
      message:this.newMessage,
      photoURL:this.userProfilePicture,
      uId:this.currentUserUId,
    }
  this.base.addMessage(body)
  this.newMessage=""
  this.messageTextarea.nativeElement.value = '';
  console.log(body)
}
}

updateMessage(message:any){
this.base.updateMessage(message)
}

deleteMessage(message:any){
this.base.deleteMessage(message)
}
// Kép feltöltés
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.uploadImage(event);
}

uploadImage(event: any) {
  event.preventDefault();
  if (!this.selectedFile) {
    return;
  }

  const filePath = `chat_images/${Date.now()}_${this.selectedFile.name}`;
  const task = this.storage.upload(filePath, this.selectedFile);
  
  // Handle the upload task, such as progress, completion, etc.
  task.then(snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      // Here you can use the downloadURL to save it in the database or do other operations
      console.log('File available at', downloadURL);
      const auth = getAuth();
      const user = auth.currentUser;
    
      if(user!==null){
        user.providerData.forEach((profile)=> {
          this.userName = profile.displayName
        })
      }
    
    
    if (downloadURL){
      let time = new Date()
      let getTime = time.getHours() + ":" + time.getMinutes()
      let body = {
          user:this.userName,
          time:getTime,
          photoURL:this.userProfilePicture,
          uId:this.currentUserUId,
          uploadedImage:downloadURL
        }
      this.base.addMessage(body)
      console.log(body)
    }
    });
  });
}
}



