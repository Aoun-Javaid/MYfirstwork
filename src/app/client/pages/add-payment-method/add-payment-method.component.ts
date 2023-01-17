import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  wihtdrawBankList:any;
  bankDetails:any =[
    {
      "id": "63c6b58e6c667bbc4ba5b2ae",
      "accountHolderName": "KUNTLURU VENKATA BHARGAV",
      "accountNumber": "156310100096439",
      "bankName": "Union Bank of India",
      "logo": "http://logo.com",
      "accountType": "Savings",
      "paymentType": "BANK",
      "ifsc": "UBIN0815632",
      "status": "APPROVED"
    }
  ];
  upiDetails:any ={
    "paytm": [
      {
        "id": "63c664fc6c667bbc4ba5a8a6",
        "paytmName": "Shubham Kumar Singh ",
        "paytmNumber": "7479608617",
        "paymentType": "PAYTM",
        "status": "APPROVED"
      }
    ],
    "phonepe": [
      {
        "id": "63c6f39e26340dbc7140ade8",
        "phonepeName": "Ramireddyjajula",
        "phonepeNumber": "7760763584",
        "paymentType": "PHONEPE",
        "status": "PENDING"
      }
    ],
    "gpay": [
      {
        "id": "63c6aaf320a70dbc84e5476d",
        "gpayName": "Abtab Alam ",
        "gpayNumber": "9875679827",
        "paymentType": "GPAY",
        "status": "APPROVED"
      }
    ],
    "upi": [

    ]
  };
  constructor(private appserive:AppService,public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.getWithdrawalBankDetails();
  }
  getWithdrawalBankDetails(){
    this.appserive. getWithdrawalBankDetails().subscribe((res:any)=>{
      if(res.meta.status_code==200){
        this.wihtdrawBankList=res.data;
        this.bankDetails=res.data.bankDetails;
        this.upiDetails=res.data.upiDetails;
        this.toastr.successToastr(res.meta.message);
      }
      else{
        this.toastr.errorToastr(res.meta.message);
      }
  });
  }
  deleteWithdrawalBankDetails(id:any){
      this.appserive.deleteWithdrawalBankDetails(id).subscribe((res:any)=>{
          if(res.meta.status_code==200){
            this.toastr.successToastr(res.meta.message);
          }
          else{
            this.toastr.errorToastr(res.meta.message);
          }
      });
  }

}
