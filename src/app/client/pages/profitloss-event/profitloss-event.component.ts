import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profitloss-event',
  templateUrl: './profitloss-event.component.html',
  styleUrls: ['./profitloss-event.component.css']
})
export class ProfitlossEventComponent implements OnInit {

  dtOptions: DataTables.Settings = {};


  profitlossStatement :any=[];

   sportsId:string;
   startDate:string;
   endDate:string;
   gameType:string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  constructor(private appService: AppService,private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe(params => {
      this.sportsId = params.id;
      this.startDate = params.startDate;
      this.endDate = params.endDate;
      this.gameType = params.dataSource;
    });

  }

  draw = {
    "startDate": "2023-01-17T20:01:55+04:00",
    "endDate": "2023-01-18T20:01:55+04:00",
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
        "data": 4,
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
    "sportId":"66102"

  }

  ngOnInit(): void {

    this.draw.sportId=this.sportsId;
    this.draw.startDate = this.startDate;
    this.draw.endDate=this.endDate;
    this.draw.dataSource=this.gameType;
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 1,
      // tabIndex: 2,
      // serverSide: true,
      // processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        this.appService.userEventsProfitloss(this.draw)
              .subscribe(resp => {

                this.profitlossStatement=resp.data.original.data;
                this.profitlossStatement.filter(el => {
                  let total = el.pl + el.commission
                  return el.total = total
                })
                console.log(this.profitlossStatement)
                  callback({
                      recordsTotal: resp.data.original.recordsTotal,
                      data: this.profitlossStatement,
                  });
              });
      },
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
          title: 'Profit /Loss',
          data: 'pl'
        },
        {
        title: 'Commission',
        data: 'commission'
      },
        {
          title: 'Total P&L',
          data: 'total'
        }

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
    this.router.navigate([`/client/profitloss-market/${info.eventId}/LIVE`])
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

  SubmitdataTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);

      this.appService.userSportsProfitloss(this.draw).subscribe((res => {
        this.profitlossStatement = res.data.original.data;
        this.dtOptions.data = this.profitlossStatement;
        this.dtOptions.columns= this.draw.columns;


      }));
    });

  }

}
