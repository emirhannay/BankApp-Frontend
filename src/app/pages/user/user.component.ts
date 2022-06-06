import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/AccountService/account.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { CardService } from 'src/app/services/CardService/card.service';
import { PaymentService } from 'src/app/services/PaymentService/payment.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit {
  payment_cardNo: any;
  payment_cvv: any;

  constructor(private accountService: AccountService, private authService:AuthService, private cardService:CardService, private paymentService:PaymentService) { }

  accounts:any = [];
  cards:any = [];
  activities:any;
  cardDetails:any = null;
  newAccountCard;
  selectedAccount;
  currency;
  type;
  creditCardInfoText='';
  sender;
  receiver;
  amount;
  description;
  sendMoneyErrorText='';
  cardActivity:any=[];

  showDepositForm=false;
  depositFormErrorText='';
  deposit_amount;
  deposit_month;
  selectedSavingAccountId;

  showPayForm=false;
  payFormErrorText='';
  paySuccessText='';
  pay_amount;
  firms:any=[];
  selected_firm;

  ngOnInit(): void {

  }
  getAccounts(){
    this.accountService.getAccountsByUserId(localStorage.getItem('id')).subscribe(accounts=>{
      console.log(accounts);
      this.accounts = accounts;
    },error=>{
      console.log(error);
    })
  }
  getCards(){
    this.cardService.getCardsByUserId(localStorage.getItem('id')).subscribe(cards=>{
      console.log("cards",cards);
      this.cards = cards;
    },error=>{
      console.log(error);
    })
  }
  getCardDetails(card){
    this.cardService.getCardDetailsByUserId(localStorage.getItem('id')).subscribe(cardDetails=>{
      console.log("cards",cardDetails);
      this.cardDetails = cardDetails;
      this.cardDetails.cardNo = card.cardNo;
      this.getCreditCardActivity();
    },error=>{
      console.log(error);
    })
  }

  applyForCreditCard(){
    this.cardService.applyForCreditCard(localStorage.getItem('id')).subscribe(response=>{
      console.log("credit card apply",response);
      this.creditCardInfoText=response;
      this.getCards();
    },error=>{
      console.log("err",error);
      this.creditCardInfoText=JSON.parse(error.error).errorMessage;
    })
  }

  ngAfterViewInit() {
    this.getAccounts();
    this.getCards();
  }

  getAccountActivity(account){
    if(account.accountType == 'DRAWING'){
      this.accountService.getAccountsActivityByIban(account.iban).subscribe(activity=>{
        console.log(activity);
        this.selectedAccount = account;
        this.activities = activity;
        console.log(this.selectedAccount,this.activities);
      },error=>{
        console.log(error);
      })
    }else if(account.accountType == 'SAVINGS'){
      this.accountService.getAccountsActivityByIbanForSavings(account.iban).subscribe(activity=>{
        console.log(activity);
        this.selectedAccount = account;
        this.activities = activity;
        console.log(this.selectedAccount,this.activities);
      },error=>{
        console.log(error);
      })
    }

  }

  newAccount(){
    this.accountService.newAccount(this.currency, this.type).subscribe(response=>{
      console.log(response);
      this.getAccounts();
      this.getCards();
    },error=>{
      console.log(error);
    })
    this.newAccountCard = false;
    
  }

  navigate(url){
    document.location.href=url;
  }

  sendMoney(){
    this.accountService.transferMoney(this.sender,this.receiver,this.amount,this.description).subscribe(response=>{
      console.log(response);
      this.getAccounts();
    },error=>{
      console.log(error);
      if(error.status == 400){
        this.sendMoneyErrorText = JSON.parse(error.error).errorMessage;
      }
    })
  }

  getCreditCardActivity(){
    this.cardService.getCreditCardActivity(this.cardDetails.cardNo).subscribe(activities=>{
      this.cardActivity = activities;
      console.log(this.cardActivity);
    });
  }

  deposit(){
    this.accountService.depositToSavingAccount(this.deposit_amount,this.selectedSavingAccountId,this.deposit_month).subscribe(response=>{
      console.log(response);
      this.getAccounts();
    },error=>{
      console.log(error);
      if(error.status == 400){
        this.sendMoneyErrorText = JSON.parse(error.error).errorMessage;
      }
    })
  }
  depositForm(accountId){
    this.showDepositForm = !this.showDepositForm;
    this.selectedSavingAccountId = accountId;
  }

  getFirms(){
    this.paymentService.getPayableFirms().subscribe(response=>{
      console.log(response);
      this.firms = response;
    },error=>{
      console.log(error);
      if(error.status == 400){
        //this.sendMoneyErrorText = JSON.parse(error.error).errorMessage;
      }
    })
  }

  payForm(cardNo,cvv){
    this.showPayForm = true;
    this.payment_cardNo = cardNo;
    this.payment_cvv = cvv;
    this.getFirms();
  }
  pay(){
    this.paymentService.pay(this.payment_cardNo,this.selected_firm,this.pay_amount,this.payment_cvv).subscribe(response=>{
      console.log(response);
      this.paySuccessText='Payment is successful';
      this.payFormErrorText='';
      this.getCreditCardActivity();
      this.getAccounts();
    },error=>{
      console.log(error);
      if(error.status == 400){
        this.payFormErrorText = JSON.parse(error.error).errorMessage;
        this.paySuccessText = '';
      }
    })
  }
}
