import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Request:HttpClient) { }
  SendMessage(message:any){
    return this.Request.post("http://localhost:8080/AddMessage",message);
  }
  Conversations(UserId:any){
    return this.Request.get("http://localhost:8080/FindConversation?UserId="+UserId)
  }
  getMessages(SenderId:any,RecipientId:any){
    return this.Request.get("http://localhost:8080/FindMessages?SenderId="+SenderId+"&RecipientId="+RecipientId)
  }
  authenticate(User:any){
    return this.Request.post("http://localhost:8080/Authenticate",User);
  }
  findUser(username:string){
    return this.Request.get("http://localhost:8080/findUser?Username="+username)
  }
  addUser(user:any){
    return this.Request.post("http://localhost:8080/addUser",user);
  }
}
