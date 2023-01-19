import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../services/app.service";
import {ToastrManager} from "ng6-toastr-notifications";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  DepositForm: any;
  imgUrl:any;
  ImageBinary:any;
  constructor(private appService:AppService,private toaster:ToastrManager,private fb: FormBuilder, private httpClient:HttpClient) {
    this.DepositForm = fb.group({
      amount: ['',[Validators.required]],
    });
  }
  SERVER_URL = "http://130.172.1.139:4567/v1/exchange/users/uploadPaymentDetails";
  uploadForm: FormGroup;
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
  showBankPortion:boolean=true;
  ngOnInit(): void {
    this.getDepositDetails();
    this.uploadForm = this.fb.group({
      profile: ['']
    });
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

  OnSubmitImg() {
    console.log("button");


    let formData = new FormData();
    console.log("formdatamy", formData);
    formData.append('paymentImage', this.ImageBinary);
    formData.append('amount', JSON.stringify(this.DepositForm.amount=100));
    formData.append('operatorId',JSON.stringify(this.BankDetails.operatorId));
    formData.append('operatorName',JSON.stringify(this.BankDetails.operatorName) );

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
           this.ImageBinary=reader.result
        }
        // reader.onloadend = () =>{
        //   this.imgUrl = target;
        //   this.ImageBinary =reader.result;
        //   console.log("asda",this.ImageBinary);
        // }

      } else {
        target = null;
      }
    }
  }




}
