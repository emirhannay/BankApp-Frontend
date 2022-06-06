import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/AdminService/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any = [];
  accounts:any = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllAccounts();
  }

  getAllCustomers(): any {
    this.adminService.getAllCustomers().subscribe(users => {
      console.log(users);
      this.users = users;
    },error=>{
      console.log(error);
    })
  }

  getAllAccounts(): any {
    this.adminService.getAllAccounts().subscribe(accounts => {
      console.log(accounts);
      this.accounts = accounts;
    },error=>{
      console.log(error);
    })
  }

}
