import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profitloss-market',
  templateUrl: './profitloss-market.component.html',
  styleUrls: ['./profitloss-market.component.css']
})
export class ProfitlossMarketComponent implements OnInit {

  dtOptions: DataTables.Settings = {};


  profitlossStatement :any=[];



  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  eventId: any;
  dataSource: any;

  constructor(private appService: AppService,private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.eventId = params.eventId;
      this.dataSource = params.dataSource;
    });
  }

  draw = {
    "dataSource": "LIVE",
    "draw": 1,
    "columns": [
      {
        "data": "sportName",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "eventName",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "marketName",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "result",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "pl",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
      {
        "data": "commission",
        "name": "",
        "searchable": true,
        "orderable": true,
        "search": {
          "value": "",
          "regex": false
        }
      },
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
    "eventId":"102386588468"

  }

  ngOnInit(): void {
     this.draw.eventId=this.eventId;
     this.draw.dataSource=this.dataSource;
    this.dtOptions = {
      pagingType: 'full_numbers',
      ajax: (dataTablesParameters: any, callback) => {

        this.appService.userMarketsProfitloss(this.draw)
              .subscribe(resp => {

                this.profitlossStatement=resp.data.original.data;;
                  callback({
                      recordsTotal: resp.data.original.recordsTotal,
                      data: this.profitlossStatement,
                  });
              });
      },
      data: this.profitlossStatement,
      columns: [
        {
          title: 'Sport Name',
          data: 'sportName'
        },
        {
          title: 'Event Name',
          data: 'eventName'
        },
        {
          title: 'Market Name',
          data: 'marketName'
        },
        {
          title: 'Result',
          data: 'result'
        },
        {
          title: 'Profit/Loss',
          data: 'pl'
        },
        {
          title: 'Commission',
          data: 'commission'
        },
        {
          title: 'Settle Time',
          data: 'createdAt'
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
    console.log(info);
    this.router.navigate([`/client/d-profit-history/${info.sportId}/${info.marketId}/LIVE`]);
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
  // ngModelStartChange($event: any) {
  //   this.startDate = $event.target.value;
  //   //debugger
  // }
  // ngModelEndChange($event: any) {
  //   this.endDate = $event.target.value;

  // }

  // SubmitdataTable() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.clear();
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next(null);
  //     debugger
  //     this.appService.userSportsProfitloss(this.draw).subscribe((res => {
  //       this.profitlossStatement = res.data.original.data;
  //       this.dtOptions.data = this.profitlossStatement;
  //       this.dtOptions.columns= this.draw.columns;


  //     }));
  //   });
  // }

}
