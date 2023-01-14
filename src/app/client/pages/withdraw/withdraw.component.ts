import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  WithdrawForm: any;
  CWAmount:any;
  error:any;
  withdrawAmount:any;
  constructor(private fb: FormBuilder,private appService:AppService) {
  
    this.WithdrawForm = fb.group({
      amount: ['',[Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.error="";
  }
  calculateWithdrawalAmount(){
    this.appService.calculateWithdrawalAmount(this.WithdrawForm.value.amount).subscribe((res=>{
            this.CWAmount=res;
        
        
    })
  )}
}
