import {Component, OnInit} from '@angular/core';
import {CountryISO, PhoneNumberFormat, SearchCountryField} from 'ngx-intl-tel-input';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });


  constructor() {
  }

  ngOnInit(): void {
  }

}
