import { Component } from '@angular/core';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private base:BaseService,private auth:AuthService){

  }

  

}
