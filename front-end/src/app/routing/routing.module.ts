import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from "../chat/chat.component";
import {LoginComponent} from "../login/login.component";
import {authGuard} from "../authentication/auth.guard";
import {SignupComponent} from "../signup/signup.component"; // CLI imports router

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"chat",component:ChatComponent,canActivate:[authGuard]},
  {path:"signup",component:SignupComponent},
  {path:"**",component:LoginComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
