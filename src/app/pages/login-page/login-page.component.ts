import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email:string='';
  password:string='';
  showLoginFailedText=false;
  userNotFound=false;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
   let postData = {
     email:this.email,
     password:this.password
   };
   console.log(postData);

   this.authService.login(postData).subscribe((success:any)=>{

    console.log("Decoded",jwt_decode(success.token));
    
    let token:any = jwt_decode(success.token);

    localStorage.setItem('token',success.token);
    localStorage.setItem('id',token.customerId);

    this.authService.setActiveUser({
      role:token.roles[0],
      token:success.token,
      id:success.user_id
    });

    //Navigate dashboard depending on user roles
    if(token.roles[0] === 'ADMIN')
      this.router.navigateByUrl('/admin');
    else
      this.router.navigateByUrl('/user');
    
    this.showLoginFailedText = false;

    },(error:HttpErrorResponse)=>{
     console.log("Login failed:",error);
     if(error.status == 401){
      this.showLoginFailedText = true;
      this.userNotFound = false;
     }
     if(error.status == 400){
      this.userNotFound = true;
      this.showLoginFailedText = false;
     }
   });

  }

}
