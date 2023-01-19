import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent implements OnDestroy, OnInit {


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  catTabs: any[] = [];
  sportsID: string;
  flag: any;

  constructor(private appService: AppService) {

  }

  draw = {
    "startDate": "2023-01-16T12:44:46+04:00",
    "endDate": "2023-01-17T12:44:46+04:00",
    "dataSource": "",
    "draw": 1,
    "flag": "settle",
    "sportId": "4",
    "columns": [
      {data: "sportName", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "eventName", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "marketName", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "selectionName", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "type", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "", name: "", searchable: true, orderable: false, search: {value: "", regex: false}}
      ,
      {data: "stake", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "createdAt", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
      ,
      {data: "matchedTime", name: "", searchable: true, orderable: true, search: {value: "", regex: false}}
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

  settledBetList: any = [];
  startDate: string;
  endDate: string;

  ngOnInit(): void {
    this.getSportsList();
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

        this.appService.userSettledBetList(this.draw)
          .subscribe(resp => {

            this.settledBetList = resp.data.original.data;
            this.settledBetList.filter(el => {
              let date = new Date(el.createdAt);
              el.createdAt = date.toLocaleString();
              let datea = new Date(el.matchedTime);
              el.matchedTime = datea.toLocaleString();
              if (el.type === "L") {
                el.type = "Lay"
                return el
              }
              if (el.type === "B") {
                el.type = "Back"
                return el
              }
            })
            callback({
              recordsTotal: resp.data.original.recordsTotal,
              data: this.settledBetList,
            });
          });
      },
      data: this.settledBetList,
      columns: [{
        title: 'Sport Name',
        data: 'sportName'
      }, {
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
        }, {
          title: 'Type',
          data: 'type'
        }, {
          title: 'Odds Req.',
          data: 'oddsPrice'
        }, {
          title: 'Stake',
          data: 'stake'
        }, {
          title: 'Place Time',
          data: 'createdAt'
        }, {
          title: 'Matched Time',
          data: 'matchedTime'
        }

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
      this.draw.sportId = this.sportsID;
      this.draw.flag = this.flag;
      // this.appService.userSettledBetList(this.draw).subscribe((res => {
      //   this.settledBetList = res.data.original.data;
      //   this.dtOptions.data = this.settledBetList;
      //   this.dtOptions.columns = this.draw.columns;


      // }));
    });


  }

  onSelectedSports(value) {

    this.sportsID = value;
  }

  onSelectedType(value) {
    this.flag = value;
  }

  getSportsList() {
    this.appService.getSportsList().subscribe(data => {
      this.catTabs = data.data;
    })
  }


}
