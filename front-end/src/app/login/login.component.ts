import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../http.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger("authenticatedAnim",[
      state("false",style({opacity:1})),
      state("true",style({opacity:0})),
      transition('false <=> true', animate(2000))
    ])

]
})
export class LoginComponent implements OnInit{
  ngOnInit() {
    sessionStorage.clear();
  }
  authenticated:boolean=true;
  group=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  });
  constructor(private router:Router,private request:HttpService) {
  }

  login(username:any,password:any){
    let user={
      UserName:this.group?.value?.username,
      Password:this.group?.value?.password
    }
    if(user.UserName!="" && user.Password!=""){
      this.request.authenticate(user).subscribe(res=>{
        if(res){
          this.authenticated=true;
        }else{
          this.authenticated=false;
          setTimeout(()=>{
            this.authenticated=true;
          },1000)
        }
      })
    }
    if(this.group.valid){
    let user={
      UserName:username,
      Password:password
    }
    this.request.authenticate(user).subscribe((res:any)=>{
      if(res!=null){
        sessionStorage.setItem("token",JSON.stringify(res.token));
        this.router.navigate(["/chat"]).then()
      }
    })
    }else{
      return;
    }
  }
}
