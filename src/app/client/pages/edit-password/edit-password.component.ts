import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

 
  public opasswordType: string="password";
  public npasswordType: string="password";
  public cpasswordType: string="password";

  editForm = new FormGroup({
    oldpassword: new FormControl(),
    cpassword: new FormControl(),
    password: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }
  submitForm(){
    console.log(this.editForm.value);
  }

}
