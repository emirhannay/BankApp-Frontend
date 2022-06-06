import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showRegisterFailedText=false;
  errorMessage="";

  email:string;
  name:string;
  password:string;
  identityNo:string;
  phoneNumber:string;
  monthlyEarning:number;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    let postData = {
      email:this.email,
      name:this.name,
      password:this.password,
      identityNo:this.identityNo,
      phoneNumber:this.phoneNumber,
      monthlyEarning:this.monthlyEarning
    };
    console.log(postData);
 
    this.authService.signup(postData).subscribe((success:any)=>{
      console.log(success);
      this.showRegisterFailedText = false;
      this.router.navigateByUrl("/login");
 
    },(error:HttpErrorResponse)=>{
      console.log("Login failed:",error);
      if(error.status == 400 || error.status == 401){
       this.showRegisterFailedText = true;
       this.errorMessage = error.error.errorMessage
      }
    });
  }
}
