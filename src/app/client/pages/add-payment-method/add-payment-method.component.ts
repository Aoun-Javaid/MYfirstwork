import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'src/app/services/app.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  wihtdrawBankList:any;
  openCollapsedAccount="";
  bankDetails:any =[];
  upiDetails:any ={};
  selectedUPINAME="";
  constructor(private appserive:AppService,public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.getWithdrawalBankDetails();
  }
  AddBankDetailsForm = new FormGroup({
    paymentType: new FormControl('BANK'),
    ifsc: new FormControl('',[Validators.required,]),
    bankName: new FormControl('',Validators.required),
    accountNumber: new FormControl('',Validators.required),
    accountHolderName:new FormControl('',Validators.required)
  });
  UPIBankDetailForm = new FormGroup({
    UpiName: new FormControl('',[Validators.required,]),
    UpiNumber: new FormControl('',[Validators.required,]),
  });
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
  openAccountDetails(bank_id:any){
   if(this.openCollapsedAccount==bank_id){
     this.openCollapsedAccount="";
   }
   else{
     this.openCollapsedAccount=bank_id;
   }
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
  addWithdrawlBank(){
    if(this.AddBankDetailsForm.valid){
      this.appserive.addWithdrawalBank(
        this.AddBankDetailsForm.controls.accountHolderName.value,this.AddBankDetailsForm.controls.accountNumber.value,this.AddBankDetailsForm.controls.bankName.value,
        this.AddBankDetailsForm.controls.ifsc.value,this.AddBankDetailsForm.controls.paymentType.value,
      ).subscribe((res:any)=>{
        if(res.meta.status_code==200){
          this.toastr.successToastr(res.meta.message);
        }
        else{
          this.toastr.errorToastr(res.meta.message);
        }
        this.AddBankDetailsForm.reset();
      });
    }
    else{
      this.toastr.errorToastr('please fill the required fields');

    }


  }

  setUPI(name:any){
    this.selectedUPINAME=name;
    console.log(this.selectedUPINAME)
}
  addUPIBank(){
    if(this.UPIBankDetailForm.valid){
      switch (this.selectedUPINAME){
        case 'GPAY':
          this.appserive.addWithdrawalUPI_GPAY(this.UPIBankDetailForm.controls.UpiName.value,this.UPIBankDetailForm.controls.UpiNumber.value,this.selectedUPINAME).subscribe((res:any)=>{
            if(res.meta.status_code==200){
              this.toastr.successToastr(res.meta.message);
            }
            else{
              this.toastr.errorToastr(res.meta.message);
            }
            this.UPIBankDetailForm.reset();
          });
          break;
        case 'PHONEPE':
          this.appserive.addWithdrawalUPI_phonepay(this.UPIBankDetailForm.controls.UpiName.value,this.UPIBankDetailForm.controls.UpiNumber.value,this.selectedUPINAME).subscribe((res:any)=>{
            if(res.meta.status_code==200){
              this.toastr.successToastr(res.meta.message);
            }
            else{
              this.toastr.errorToastr(res.meta.message);
            }
            this.UPIBankDetailForm.reset();
          });
          break;
        case 'PAYTM':
          this.appserive.addWithdrawalUPI_PAYTM(this.UPIBankDetailForm.controls.UpiName.value,this.UPIBankDetailForm.controls.UpiNumber.value,this.selectedUPINAME).subscribe((res:any)=>{
            if(res.meta.status_code==200){
              this.toastr.successToastr(res.meta.message);
            }
            else{
              this.toastr.errorToastr(res.meta.message);
            }
            this.UPIBankDetailForm.reset();
          });
          break;
      }
    }
    else{
      this.toastr.errorToastr('please fill the required fields');
    }

  }

}
