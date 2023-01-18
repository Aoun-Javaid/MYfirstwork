import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../services/app.service";
import {ToastrManager} from "ng6-toastr-notifications";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  DepositForm: any;
  constructor(private appService:AppService,private toaster:ToastrManager,private fb: FormBuilder) {
    this.DepositForm = fb.group({
      amount: ['',[Validators.required]],
    });
  }
  BankDetails:any={
    "paymentType": "bank",
    "amount": "100-500000",
    "accountHolderName": "BARAIYA GITABEN DINESHBHAI",
    "accountNumber": "0794073000000224",
    "accountType": "current",
    "bankName": "BARAIYA GITABEN DINESHBHAI",
    "ifsc": "SIBL0000794",
    "operatorId": "63b2cb363887fe8a0b30deef",
    "operatorName": "TUNITY03",
    "managerId": "63971e0e4e802b47a6189d4f",
    "managerName": "MUNITY02",
    "paytmName": "BARIYA GITABEN DINESHBHAI",
    "paytmNumber": "9173845759",
    "phonepeName": "BARIYA GITABEN DINESHBHAI",
    "phonepeNumber": "9173845759",
    "gpayName": "BARIYA GITABEN DINESHBHAI",
    "gpayNumber": "9173845759",
    "upiName": "BARIYA GITABEN DINESHBHAI",
    "upiNumber": "9173845759@sib",
    "origin": "unityexch",
  };
  showBankPortion:boolean=false;
  ngOnInit(): void {
    this.getDepositDetails();
  }
  getDepositDetails(){
    this.appService.getDepositDetails(this.DepositForm.value.amount).subscribe((res:any)=>{
        if(res.meta.status_code=200){
            // this.BankDetails=res.data;
            this.showBankPortion=true;
        }
        else {
          this.toaster.errorToastr(res.meta.message);
        }
    });
  }
}
