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
    console.log("check y data", info.sportId, this.startDate, this.endDate)
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
      // this.appService.userSportsProfitloss(this.draw).subscribe((res => {
      //   this.profitlossStatement = res.data.original.data;
      //   this.dtOptions.data = this.profitlossStatement;
      //   this.dtOptions.columns = this.draw.columns;


      // }));
    });

  }

}
