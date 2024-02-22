import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',

})
export class SignInComponent {
  logoPhoto: string = '/assets/logo.gif';
  soterPhoto: string = '/assets/soterchat.png';
  backgroundRobot:string ="assets/background-robot.png";
  backgroundBlobs:string ="assets/background-bubbles.png";

email :string ='';
password:string ='';

constructor(private auth:AuthService, private router:Router){}

noAccount() {
  this.router.navigate(['./sign-up'])
}

login(){
  if(this.email == ''){
    alert('Please enter email')
    return
  }
  if(this.password == ''){
    alert('Please enter password')
    return
  }
  this.auth.login(this.email,this.password);

  this.email = '';
  this.password = '';
}
}

