import {Component, OnInit} from '@angular/core';
import {CountryISO, PhoneNumberFormat, SearchCountryField} from 'ngx-intl-tel-input';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {ToastrManager} from "ng6-toastr-notifications";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  otpBoxShow:boolean=false;
  mobileNo:any;
  public opasswordType: string="password";
  constructor(private appService:AppService,public toastr: ToastrManager,public router:Router) {
  }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    phoneNumber: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
    refral: new FormControl(''),
    username: new FormControl('',Validators.required),
    OTP:new FormControl('',Validators.required)
  });

  otpRequest(){
    this.mobileNo=this.signUpForm.controls.phoneNumber.value;
    console.log(this.mobileNo.e164Number);
    this.appService.userRegisterOtpSent(this.mobileNo.e164Number,
      this.signUpForm.controls.refral.value,
      this.signUpForm.controls.username.value).subscribe((resp:any)=>{
        if(resp.meta.status_code==200){
          this.otpBoxShow=true;
          this.toastr.infoToastr('OTP is Sent to your device');
        }
        else{
          this.toastr.errorToastr(resp.meta.message);
        }
    });
  }
  submitSignup(){
    if(this.signUpForm.valid){
      this.appService.userRegisterVerify(this.mobileNo.e164Number,
        this.signUpForm.controls.refral.value,
        this.signUpForm.controls.username.value,
        this.signUpForm.controls.password.value,
        this.signUpForm.controls.OTP.value,
      ).subscribe((resp:any)=>{
        if(resp.meta.status_code==200){
          this.otpBoxShow=true;
          this.toastr.infoToastr('Successfully Signed In');
          this.router.navigate(['/client/login']);
        }
        else{
          this.toastr.errorToastr(resp.meta.message);
        }
      });
    }
    else{
      this.toastr.errorToastr('please fill the missing Fields');
    }

  }
}
