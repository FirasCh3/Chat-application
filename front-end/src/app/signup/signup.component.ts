import { Component } from '@angular/core';
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations:[
    trigger("SignedupAnim",[
      state("true",style({opacity:1})),
      state("false",style({opacity:0})),
      transition('false <=> true', animate(2000))
    ])

  ]
})
export class SignupComponent {
  group=new FormGroup({
    username:new FormControl("",Validators.required,this.checkUserName.bind(this)),
    password:new FormControl("",Validators.required),
    passwordConfirm:new FormControl("",Validators.required,this.passwordCheck.bind(this))
  })
  signedup:boolean=false;
  constructor(private request:HttpService, private router:Router) {
  }
  checkUserName(control:AbstractControl):Promise<any>{
    return new Promise((resolve)=>{
      this.request.findUser(control.value).subscribe((result:any)=>{
        if(result[0]){
          resolve({UserNameExists:true})
        }else{
          resolve(null);
        }
      })
    })
  }
  passwordCheck(control:AbstractControl):Promise<any>{
    return new Promise((resolve)=>{
      if(this.group.value.password!=control.value){
        resolve({passwordConfirm:false})
      }else{
        resolve(null);
      }
    })
  }
  submit(group:AbstractControl){
    let that=this;
    if (group.valid) {
      let user = {
        UserName: group.value.username,
        Password: group.value.password
      }

      this.request.addUser(user).subscribe((data)=>{
        this.signedup = true
        setTimeout(()=>{
          this.signedup=false;
        },3000)
        setTimeout(()=>{
          this.router.navigate(["/"])
        },5000)
      })
    }
  }
}
