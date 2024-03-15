import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  logoPhoto: string = '/assets/logo.gif';
  soterPhoto: string = '/assets/soterchat.png';
  backgroundRobot:string ="assets/background-robot.png";
  backgroundBlobs:string ="assets/background-bubbles.png";

  email: string = '';
  password:string = '';
  passwordSecure:string = '';
  message: string;

  constructor(private auth:AuthService) {}

  register(){
    if(this.password != this.passwordSecure){
      this.message = 'A jelszavak nem egyeznek!';
      setTimeout(() => {
        this.clearAlert();
      }, 5000);
    } else {
      if(this.email == ''){
        alert('Please enter email')
        return
      }
      if(this.password == ''){
        alert('Please enter password')
        return
      }
      this.auth.register(this.email,this.password);
    
      this.email = '';
      this.password = '';
    }
    }
   
    clearAlert(): void {
      this.message = '';
    }










}
