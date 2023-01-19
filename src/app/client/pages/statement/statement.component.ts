import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  statementForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  start:any="2013-01-08";

  constructor(private appService: AppService,) {

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
    "length": 1000,
    "search": {
      "value": "",
      "regex": false
    },

  }


  dtOptions: DataTables.Settings = {};

  accountStatement: any = [];
  startDate:any= new Date();
  endDate: any= new Date();
  

  ngOnInit(): void {
    this.updateDate();
    this.draw.startDate = this.startDate;
    this.draw.endDate = this.endDate;
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 1,
      // tabIndex: 2,
      // serverSide: true,
      // processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        this.appService.userAccountStatement(this.draw)
          .subscribe(resp => {

            this.accountStatement = resp.data.original.data;
            this.accountStatement.filter(el => {
              let date = new Date(el.createdAt);
              el.createdAt = date.toLocaleString();
              return el;
            })
            callback({
              recordsTotal: resp.data.original.recordsTotal,
              data: this.accountStatement,
            });
          });
      },
      // data: this.accountStatement,
      columns: [{
        title: 'Date/Time',
        data: 'createdAt',
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
          data: 'bankBalance'
        }, {
          title: 'remark',
          data: 'remark'
        }]

    };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  completeDate: Date;
  localCompleteDate: string;

  ngModelStartChange($event: any) {
    this.startDate = $event.target.value;
    //
  }

  ngModelEndChange($event: any) {
    this.endDate = $event.target.value;

  }

  updateDate() {
    let sDate = new Date();
    sDate.setDate(sDate.getDate()-1);
    let date = sDate.toISOString();
    console.log(date)
    this.startDate=date.substr(0,10);
    let eDate= new Date();
    let enDate=eDate.toISOString();
    this.endDate=enDate.substring(0,10);
    console.log(this.startDate)
    
  }

  SubmitdataTable() {


    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);

      this.draw.startDate = this.startDate;
      this.draw.endDate = this.endDate;
      // this.appService.userAccountStatement(this.draw).subscribe((res => {
      //   this.accountStatement = res?.data.original.data;
      //   this.dtOptions.data = this.accountStatement;
      //   this.dtOptions.columns = this.draw.columns;
      // }));
    });

  }

}




