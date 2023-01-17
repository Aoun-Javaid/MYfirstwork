import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {

  draw = {
    "startDate": "2023-01-16T12:44:46+04:00",
    "endDate": "2023-01-17T12:44:46+04:00",
    "dataSource": "",
    "draw": 1,
    "columns": [
      {
        "data": "createdAt",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "deposit",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "withdraw",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "balance",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "remark",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "",
        "name": "",
        "searchable": true,
        "orderable": false,
        "search": {
          "value": "",
          "regex": false
        }
      }
    ],
    "order": [
      {
        "column": 0,
        "dir": "asc"
      }
    ],
    "start": 0,
    "length": 10,
    "search": {
      "value": "",
      "regex": false
    },

  }

  dtOptions: DataTables.Settings = {};

  profitlossForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  profitlossStatement :any=[];

  constructor(private appService: AppService) { }
  
  ngOnInit(): void {
  }
  
  SubmitdataTable() {
    this.draw.startDate = this.profitlossForm.value.startDate;
    this.draw.endDate = this.profitlossForm.value.endDate;
    this.appService.userSportsProfitloss(this.draw).subscribe((res => {
      this.profitlossStatement = res.data.original.data;
      this.dtOptions.data = this.profitlossStatement;
      console.log(this.profitlossStatement);
    }));
  }




}
