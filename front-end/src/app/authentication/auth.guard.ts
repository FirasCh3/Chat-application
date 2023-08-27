import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {HttpService} from "../http.service";
export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const request=inject(HttpService);
  if(sessionStorage.getItem("token")){
    return true;
  }else{
    router.navigate(["/"]).then();
    return false;
  }

};
