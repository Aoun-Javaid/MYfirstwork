import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {
  step:any;
  Records:any;
  dayWiseRecordBackup:any;
  constructor(private appService :AppService) { }
  
  ngOnInit(): void {
    this.getDaysWiseEvents();
  }
  getDaysWiseEvents(){
    this.step='inplay';
    this.appService.getDaysWiseEvents().subscribe((res:any)=>{
        this.dayWiseRecordBackup=res.data;
        console.log(this.dayWiseRecordBackup);
        this.cliclTab(this.step);
    });
  }
  cliclTab(value:any){
    this.step=value;
    this.Records=this.dayWiseRecordBackup[this.step];
    console.log(this.Records);
  }
  
}
