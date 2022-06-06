import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl:string = "api/sign-in";
  signupUrl:string = "api/register";
  activeUser:any={};

  constructor(private httpClient: HttpClient) { }

  login(postData:any):Observable<any>{
    return this.httpClient.post(environment.baseApiUrl+this.loginUrl,postData);
  }

  signup(postData:any):Observable<any>{
    return this.httpClient.post(environment.baseApiUrl+this.signupUrl,postData,{responseType:'text'});
  }


  setActiveUser(user:any){
    this.activeUser = user;
  }
  getActiveUser(){
    return this.activeUser;
  }
}
