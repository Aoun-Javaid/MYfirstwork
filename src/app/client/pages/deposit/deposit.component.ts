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
  imgUrl:any;
  constructor(private appService:AppService,private toaster:ToastrManager,private fb: FormBuilder) {
    this.DepositForm = fb.group({
      amount: ['',[Validators.required]],
    });
  }
  BankDetails:any={
  
  };
  showBankPortion:boolean=false;
  ngOnInit(): void {
    // this.getDepositDetails();
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
  onSelectFile(event: Event) {
    let target = event.target as HTMLInputElement;
    var reader = new FileReader();
    console.log(target);
    if (target.files && target.files.length > 0) {
      if (target.files[0].size < 5242880) {
        reader.readAsDataURL(target.files[0]); // read file as data url
        reader.onload = (target) => { // called once readAsDataURL is completed
          this.imgUrl = target;
          //this.kyc.data = this.url.target.result;
        }
      } else {
        target = null;
      }
    }
  }
}
