import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-d-profit-history',
  templateUrl: './d-profit-history.component.html',
  styleUrls: ['./d-profit-history.component.css']
})
export class DProfitHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};


  profitlossStatement :any=[];



  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  constructor(private appService: AppService) {

  }

  draw = {
    "dataSource": "LIVE",
    "marketId": "71671590214126",
    "sportId":"66102"
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
        this.appService.getUserBetList(this.draw)
              .subscribe(resp => {
                debugger
                this.profitlossStatement=resp.data;
                  callback({
                      recordsTotal: resp.data.length,
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
          title: 'Selection Name',
          data: 'selectionName'
        },
        {
          title: 'Bet Type',
          data: 'type'
        },
        {
          title: 'User Price',
          data: 'oddsPrice'
        },
        {
          title: 'Profit /Loss',
          data: 'betPl'
        },
        {
          title: 'Place Date',
          data: 'createdAt'
        },
        {
          title: 'Match Date',
          data: 'matchedTime'
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

        
      
      }));
    });

  }

}
