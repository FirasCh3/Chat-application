import {Component, OnInit} from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {HttpService} from "../http.service";
import {Message, newObject} from "./Interface";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  friends:any;
  StompClient:any;
  Messages:any=[]
  newMessages:Message[]=[];
  user:any
  recipient:any
  constructor(private request:HttpService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.user=JSON.parse(sessionStorage.getItem("token"))
    this.Conversations();
    let socket=new SockJS("http://localhost:8080/firas");
    this.StompClient=Stomp.over(socket);
    this.StompClient.connect({},(frame:any)=>{
      console.log(frame);
        this.StompClient.subscribe("/topic/messages/"+this.user.UserName,(data:any)=>{
          if(this.recipient!=undefined){
            this.newMessages.push(JSON.parse(data.body))
          }
        })
    })
  }

  filterData(data:any){
    let newData:newObject[]=[];
    let that=this;
    data.forEach(function(object:any){
        if (!newData.find(({Recipient,Sender}) => Recipient.UserName==object.Recipient.UserName || Sender.UserName==object.Recipient.UserName)) {
          newData.push(object);
        }
    })

    return newData;
  }
  getMessages(Recipient:any){
      this.recipient=Recipient;
        this.request.getMessages(this.user.UserId,Recipient.UserId).subscribe((data:any)=>{
          console.log(data)
         this.Messages=data;
        })
  }
  Conversations(){
    this.request.Conversations(this.user.UserId).subscribe(data=>{
      this.friends=this.filterData(data);
      console.log(this.friends)
    })
  }
  sendMessage(message:string){
    if(message!="") {
      let Sender = this.user;
      let Recipient = this.recipient;
      if (Recipient != undefined) {
        let Message = {
          Sender: Sender,
          Recipient: Recipient,
          Content: message
        }
        this.request.SendMessage(Message).subscribe();
        this.StompClient.send("/app/sendMessage/" + Recipient.UserName + "/" + Sender.UserName, {}, JSON.stringify({
          Content: message,
          Sender: Sender.UserId
        }))
      } else {
        return;
      }
    }
  }
  AddConversation(input:string){
    this.request.findUser(input).subscribe((data:any)=>{
      for (let user of this.friends) {
        if(input==user.Recipient.UserName){
          return;
        }
      }
      let newFriend={
        Sender:{
          UserId: this.user.UserId,
          UserName: this.user.UserName,
          Password: this.user.Password
        },
        Recipient: {
          UserId:data[0].UserId,
          UserName:data[0].UserName,
          Password:data[0].Password
        }
      }
      this.friends.push(newFriend);
  })
  }
}
