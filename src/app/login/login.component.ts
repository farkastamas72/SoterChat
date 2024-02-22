import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
