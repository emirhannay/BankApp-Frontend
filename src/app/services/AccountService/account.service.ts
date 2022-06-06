import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../AuthService/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getAccountsByUserId(id){
    let url:string = `${environment.baseApiUrl}api/users/customers/${id}/accounts`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.get(url,{headers:headers});
  }

  getAccountsActivityByIban(iban){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts/transfers?iban=${iban}`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.get(url,{headers:headers});
  }
  getAccountsActivityByIbanForSavings(iban){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts/savings?iban=${iban}`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.get(url,{headers:headers,responseType:'json'});
  }

  newAccount(currency,type){

    let url:string = '';

    if(type === 'drawing'){
      url = `${environment.baseApiUrl}api/users/customers/accounts/drawings`;
    }
    else if(type === 'savings'){
      url = `${environment.baseApiUrl}api/users/customers/accounts/savings`;
    }

    let postData = {
      currency:currency,
      customerId:+localStorage.getItem('id')
    }
    
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.post(url,postData,{headers:headers,responseType:'text'});
  }

  transferMoney(sender,receiver,amount,description){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts/transfer`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    let postData = {
      senderIban:sender,
      receiverIban:receiver,
      amount:amount,
      description:description
    }
    return this.httpClient.post(url,postData,{headers:headers,responseType:'text'});
  }

  depositToSavingAccount(amount,savingsAccountId,month){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts/savings/deposit`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    let postData = {
      amount:amount,
      savingsAccountId:savingsAccountId,
      month:month
    }
    return this.httpClient.post(url,postData,{headers:headers,responseType:'text'});
  }
}
