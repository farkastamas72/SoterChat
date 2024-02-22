import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
