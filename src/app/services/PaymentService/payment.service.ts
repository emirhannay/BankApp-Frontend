import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getPayableFirms(){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts/corporate`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get(url,{headers:headers,responseType:'json'});
  }

  pay(cardNo,iban,amount,cvv){
    let url:string = `${environment.baseApiUrl}api/pay`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    let postData = {
      senderCardNo:cardNo,
      receiverIban:iban,
      amount:amount,
      cvv:cvv
    }
    debugger;
    return this.httpClient.post(url,postData,{headers:headers,responseType:'text'});
  }

}
