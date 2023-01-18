import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private appService: AppService) {

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
    "eventId":"20217121919235"

  }

  startDate: string;
  endDate: string;
  ngOnInit(): void {
debugger
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 1,
      // tabIndex: 2,
      // serverSide: true,
      // processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        debugger
        this.appService.userEventsProfitloss(this.draw)
              .subscribe(resp => {
                debugger
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
       
      ]

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
    //debugger
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
      debugger
      this.appService.userSportsProfitloss(this.draw).subscribe((res => {
        this.profitlossStatement = res.data.original.data;
        this.dtOptions.data = this.profitlossStatement;
        this.dtOptions.columns= this.draw.columns;
        
      
      }));
    });

  }
}
