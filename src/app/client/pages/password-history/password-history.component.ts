import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-password-history',
  templateUrl: './password-history.component.html',
  styleUrls: ['./password-history.component.css']
})
export class PasswordHistoryComponent implements OnInit {


  statementForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(private appService: AppService) {

  }

  draw = {
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

  dtTrigger: Subject<any> = new Subject<any>()
  accountStatement: any = [];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 1,
      tabIndex: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.appService.getPasswordHistory(this.draw)
          .subscribe(resp => {
            this.accountStatement = resp.data.original.data;
            callback({
              recordsTotal: this.accountStatement.length,
              data: resp.data.original.data,
            });
          });
      },
      data: this.accountStatement,
      columns: [{
        title: 'Date/Time',
        data: 'createdAt'
      }, {
        title: 'Deposit',
        data: 'deposit'
      },
        {
          title: 'Withdraw',
          data: 'withdraw'
        },
        {
          title: 'Balance',
          data: 'balance'
        }, {
          title: 'remark',
          data: 'remark'
        }, {
          title: 'From/To',
          data: 'From/To'
        }]

    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  SubmitdataTable() {
    this.appService.userAccountStatement(this.draw).subscribe((res => {
      this.accountStatement = res.data.original.data;
      this.dtOptions.data = this.accountStatement;
    }));

  }
}
