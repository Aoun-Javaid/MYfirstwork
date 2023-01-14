import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  constructor() {

  }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:1,
      tabIndex:2,
      ajax: 'data/data.json',
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
}
