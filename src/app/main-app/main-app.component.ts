import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent {
  userName="Attila"
messages:any;
newMessage:any;
constructor(private base:BaseService){
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

addMessage(){
if (this.newMessage){
  let time = new Date().toLocaleTimeString()
  let body = {user:this.userName, time:time, message:this.newMessage}
  this.base.addMessage(body)
  this.newMessage=""
  console.log(body)
}
}

updateMessage(message:any){
this.base.updateMessage(message)
}

deleteMessage(message:any){
this.base.deleteMessage(message)
}

}
