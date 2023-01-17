import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {

  constructor(private appService: AppService) { }
  
  ngOnInit(): void {
  }
  
  // SubmitdataTable() {
  //   this.draw.startDate = this.statementForm.value.startDate;
  //   this.draw.endDate = this.statementForm.value.endDate;
  //   this.appService.userSportsProfitloss(this.draw).subscribe((res => {
  //     this.accountStatement = res.data.original.data;
  //     this.dtOptions.data = this.accountStatement;

  //   }));
  // }
}
