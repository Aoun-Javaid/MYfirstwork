import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  
  statementForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  constructor(private appService:AppService) {

  }

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

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:1,
      tabIndex:2,
     // ajax: 'data/data.json',
      columns: [{
        title: 'Date/Time',
        data: 'Date/Time'
      }, {
        title: 'Deposit',
        data: 'Deposit'
      },
        {
          title: 'Withdraw',
          data: 'Withdraw'
        },
        {
        title: 'Balance',
        data: 'Balance'
      }, {
        title: 'Remark',
        data: 'Remark'
      }, {
        title: 'From/To',
        data: 'From/To'
      }] 

    };

  }


  

  SubmitdataTable(){
    debugger
    console.log(this.statementForm.value);
    this.draw.startDate=this.statementForm.value.startDate;
    this.draw.endDate=this.statementForm.value.endDate;
    this.appService.userAccountStatement(this.draw).subscribe((res=>{
          console.log(res.data);
    }));

  }

}


 

