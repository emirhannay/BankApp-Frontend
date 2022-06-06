import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(){
    let url:string = `${environment.baseApiUrl}api/users/customers`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.httpClient.get(url,{headers:headers,responseType:'json'});
  }

  getAllAccounts(){
    let url:string = `${environment.baseApiUrl}api/users/customers/accounts`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.httpClient.get(url,{headers:headers,responseType:'json'});
  }
}
