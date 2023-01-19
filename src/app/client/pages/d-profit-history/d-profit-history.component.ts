import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-d-profit-history',
  templateUrl: './d-profit-history.component.html',
  styleUrls: ['./d-profit-history.component.css']
})
export class DProfitHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};


  profitlossStatement: any = [];



  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dataSource: any;
  marketId: any;
  sportsId: any;

  constructor(private appService: AppService, private route: ActivatedRoute, public toastr: ToastrManager) {
    this.route.params.subscribe(params => {
      this.sportsId = params.sportId;
      this.marketId = params.marketId;
      this.dataSource = params.dataSource;
    });
  }

  draw = {
    "dataSource": "LIVE",
    "marketId": "71671590214126",
    "sportId": "66102"
  }

  ngOnInit(): void {
    
    this.draw.dataSource = this.dataSource;
    this.draw.marketId = this.marketId;
    this.draw.sportId = this.sportsId;
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 1,
      // tabIndex: 2,
      // serverSide: true,
      // processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        
        this.appService.getUserBetList(this.draw)
          .subscribe(resp => {

            this.profitlossStatement = resp.data;
            callback({
              recordsTotal: resp.data.length,
              data: resp.data,
            });

            if (resp.meta.status_code == 422) {
              this.toastr.errorToastr(resp.meta.message)
            }


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


  // SubmitdataTable() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.clear();
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next(null);
  //     
  //     this.appService.userSportsProfitloss(this.draw).subscribe((res => {
  //       this.profitlossStatement = res.data.original.data;
  //       this.dtOptions.data = this.profitlossStatement;



  //     }));
  //   });

  // }

}
