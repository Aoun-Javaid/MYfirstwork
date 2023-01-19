import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AppService} from 'src/app/services/app.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};

  profitlossForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  profitlossStatement: any = [];


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  constructor(private appService: AppService, private router: Router) {

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

  startDate: string;
  endDate: string;

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

        this.appService.userSportsProfitloss(this.draw)
          .subscribe(resp => {

            this.profitlossStatement = resp.data.original.data;
            callback({
              recordsTotal: resp.data.original.recordsTotal,
              data: this.profitlossStatement,
            });
          });
      },
      // data: this.profitlossStatement,
      columns: [
        {
          title: 'Sport Name',
          data: 'sportName'
        },
        {
          title: 'Profit / Loss',
          data: 'pl'
        },
        {
          title: 'Commission',
          data: 'commission'
        },
        // {
        //   title: 'Total P&L',
        //   data: ''
        // },

      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };

  }
  someClickHandler(info: any): void {
    console.log(info)
    this.startDate;
    this.endDate;
    this.router.navigate([`/client/profitloss-event/${info.sportId}/${this.startDate}/${this.endDate}/LIVE`])
    console.log("check y data",info.sportId,this.startDate, this.endDate)
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
    if (min < 9) {
      minutes = '0' + (min + 1);
    } else if (min == 59) {
      minutes = '00';
      hours = (Number(hours) + 1).toString();
    } else {
      minutes = (min + 1).toString();
    }
    var dates = new Date();
    let month: any = dates.getMonth() + 1;

    if (Number(month) < 10) {
      month = '0' + month;
    }

    this.endDate = new Date().toISOString();
    this.endDate = this.endDate.substr(0, 4);

    this.endDate = this.endDate + '-' + month + '-' + date + 'T' + hours + ':' + minutes;
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
      this.appService.userSportsProfitloss(this.draw).subscribe((res => {
        this.profitlossStatement = res.data.original.data;
        this.dtOptions.data = this.profitlossStatement;
        this.dtOptions.columns = this.draw.columns;


      }));
    });

  }

}
