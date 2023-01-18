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

  };
  showBankPortion:boolean=false;
  ngOnInit(): void {
    this.getDepositDetails();
  }
  getDepositDetails(){
    this.appService.getDepositDetails(this.DepositForm.value.amount).subscribe((res:any)=>{
        if(res.meta.status_code=200){
            this.BankDetails=res.data;
            this.showBankPortion=true;
        }
        else {
          this.toaster.errorToastr(res.meta.message);
        }
    });
  }
}
