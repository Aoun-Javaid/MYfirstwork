import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
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

  constructor(private appService: AppService) {

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
  startDate: string;
  endDate: string;
  ngOnInit(): void {
    this.updateDate();
    this.draw.startDate=this.startDate;
    this.draw.endDate=this.endDate;
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 1,
      // tabIndex: 2,
      // serverSide: true,
      // processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        
        this.appService.userAccountStatement(this.draw)
              .subscribe(resp => {
                
                this.accountStatement=resp.data.original.data;;
                  callback({
                      recordsTotal: resp.data.original.recordsTotal,
                      data: this.accountStatement,
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

    let sDate: any = new Date();
    sDate = sDate.toString();
    let date = sDate.substr(8, 2);
    //this.startDate = new Date();
    this.completeDate = new Date();
    let hours: any = this.completeDate.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    let minutes: any = this.completeDate.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let hrstest = date.split("");
    if (Number(hrstest[0]) != 0 && Number(date) < 10) {
      date = '0' + date;
    }


    this.completeDate.setDate(this.completeDate.getDate() - 1);
    this.localCompleteDate = this.completeDate.toISOString();
    this.startDate = this.completeDate.toISOString()
    this.startDate = this.startDate.substr(0, 10);
    this.startDate = this.startDate + 'T' + hours + ':' + minutes;
    // 2022-04-20T16:23

    // this.startDate = this.localCompleteDate.substring(0, this.localCompleteDate.length - 1);
    // this.startDate=new Date(this.completeDate.getTime() - (this.completeDate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    //   this.startDate = this.startDate.substr(0, 16);
    //this.startDate.setDate(this.startDate.getDate() - 4);
    let min = Number(minutes);
    if(min<9){
      minutes= '0'+(min+1);
    }
    else if(min==59){
      minutes='00';
      hours=(Number(hours)+1).toString();
    }
    else{
      minutes=(min+1).toString();
    }
    var dates = new Date();
    let month:any = dates.getMonth()+1;

    if(Number(month)<10){
      month='0'+month;
    }

    this.endDate = new Date().toISOString();
    this.endDate = this.endDate.substr(0, 4);

    this.endDate = this.endDate+'-'+month+'-'+ date + 'T' + hours + ':' + minutes;
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
      this.appService.userAccountStatement(this.draw).subscribe((res => {
        this.accountStatement = res.data.original.data;
        this.dtOptions.data = this.accountStatement;
        this.dtOptions.columns= this.draw.columns;
        
      
      }));
    });

  }

}




