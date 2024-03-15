import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  logoPhoto: string = '/assets/logo.gif';
  soterPhoto: string = '/assets/soterchat.png';
  backgroundRobot:string ="assets/background-robot.png";
  backgroundBlobs:string ="assets/background-bubbles.png";

  email: string = '';
  message: string;

  constructor(private auth:AuthService) {}

forgotPassword(){
this.auth.forgotPassword(this.email);
this.email ='';
}
}
