import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ConfirmedValidator } from 'src/app/Validators/confirmed.validator';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

 
  public opasswordType: string="password";
  public npasswordType: string="password";
  public cpasswordType: string="password";
  editForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder,private appService:AppService) {
  
    this.editForm = fb.group({
      oldpassword: ['',[Validators.required]],
      password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      cpassword: ['', [Validators.required, ConfirmedValidator]]
    }, { 
      validator: ConfirmedValidator('password', 'cpassword')
    })
  }
    
  get f(){
    return this.editForm.controls;
  }
  // editForm = new FormGroup({
  //   oldpassword: new FormControl('',[Validators.required]),
  //   cpassword: new FormControl('',[Validators.required]),
  //   password: new FormControl('',[Validators.required,Validators.pattern('^(?=.?[A-Z])(?=(.[a-z]){1,})(?=(.[\d]){1,})(?=(.[\W]){1,})(?!.*\s).{8,}$')])
  // });

  ngOnInit(): void {
  }
  submitForm(){
    if(this.editForm.valid){
      this.appService.changeUserPassword(this.editForm.value.password,this.editForm.value.oldpassword).subscribe((res:any)=>{
        
      });
    }
    else{
      // show error
    }

   
  }

}
