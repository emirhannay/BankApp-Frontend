import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getCardsByUserId(id){
    let url:string = `${environment.baseApiUrl}api/users/customers/${id}/cards`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.get(url,{headers:headers});
  }

  getCardDetailsByUserId(id){
    let url:string = `${environment.baseApiUrl}api/users/customers/${id}/cards/credit`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);

    return this.httpClient.get(url,{headers:headers});
  }

  applyForCreditCard(id){
    let url:string = `${environment.baseApiUrl}api/users/customers/${id}/cards/credit`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);
    return this.httpClient.post(url,{},{headers:headers,responseType:'text'});
  }

  getCreditCardActivity(cardNo){
    let url:string = `${environment.baseApiUrl}api/users/customers/cards/credit?cardNo=${cardNo}`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //headers.append('Bearer: ',this.authService.getActiveUser().token);
    return this.httpClient.get(url,{headers:headers,responseType:'json'});
  }

}
