import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
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
  WithdrawList:any;
  constructor(private fb: FormBuilder,private appService:AppService,public toastr: ToastrManager) {
  
    this.WithdrawForm = fb.group({
      amount: ['',[Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.error="";
    this.getWithdrawList();
  }
  calculateWithdrawalAmount(){
    this.appService.calculateWithdrawalAmount(this.WithdrawForm.value.amount).subscribe((res=>{
            this.CWAmount=res;
        
        
    })
  )}
  SubmitwithdrawRequest(){
      this.appService.withdrawalRequest(this.WithdrawForm.value.amount).subscribe((res=>{
            if(res.meta.status_code==200){
              this.toastr.successToastr(res.meta.status)
            }
            else{
              this.toastr.errorToastr(res.meta.status)
            }
      }));
  }
  getWithdrawList(){
    this.appService.getWithdrawalList().subscribe((res:any)=>{
          this.WithdrawList=res.data;
    });
  }
}
