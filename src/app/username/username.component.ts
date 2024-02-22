import { Component } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrl: './username.component.css'
})
export class UsernameComponent {

  constructor(private auth:Auth){}
  userNameAdded:string;
  usernameAdd(){
    this.auth.currentUser.displayName === "Ferenc"
    
    console.log(this.auth.currentUser)
  }


}
