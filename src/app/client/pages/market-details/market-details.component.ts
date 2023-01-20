import { Component, OnInit, TemplateRef, ElementRef, ViewChild, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONFIG, STACK_VALUE } from './../../../../../config';
import { AppService } from './../../../services/app.service';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
// import { AuthenticationService } from './../../_services/authentication.service';

import { HeaderComponent } from './../../partials/header/header.component';

declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
// import { UserIdleService } from 'angular-user-idle';
import * as _ from 'lodash';
declare var T20RTCPlayer: any;
declare var Hls: any;


@Component({
  selector: 'app-market-statement-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {


  @ViewChild('modal') modal: ElementRef;
  MybetsRecord:any=[];
  modalRef: BsModalRef;
  modalRefBet: BsModalRef;
  isCollapsed: boolean = false;
  private httpSubscription: Subscription;
  sportbookSubscription: Subscription;
  oddsModal: any;
  stackModal: number;
  stackCalculateProfit: number;
  betLimit: any;
  routeSub: Subscription;
  public _id: string;
  public _sportid: string;
  marketEventIds = [];
  marketTime: string;
  betPriceDataOdds: any;
  runnerDataOdds: any;
  plDataOdds: any;
  betFor: string;
  matchOdss = [];
  backLayClsModal = '';
  totalMatchedOdds: any;
  totalProfit: number;
  marketId: string;
  marketIdOdds: string;
  matchOddsStatus: string;
  selectionId: string;
  otherMarketCliked: boolean = false;
  isLoggedIn;
  otherMarketGameID: string;
  bookieData = [];
  otherMarkerOpenIds: string;
  private leggedUserId: string;
  isMatchOddData: boolean = false;
  isBookieData: boolean = false;
  fancyBookListData: any;
  public fancyRate = '';
  public intrvl: number;
  public intrvlCashOut: number;
  private intrvlBackLay: number;
  public betPriceDataCurrent = {};

  public runnerDataCurrent = {};
  public profitLossCurrent = {};
  public totalMatchedCurrent = {};
  public matchStatusCurrent = {}
  public betType: string;
  public profitLossBookie = [];
  betfairSubscription!: Subscription;
  bookmakerSubscription!: Subscription;
  fancySubscription!: Subscription;
  binarySubscription: Subscription;
  comment: any;
  matchOddMrID: any;
  closeSocket: boolean = true;
  websocket: any;
  allMarketPl = {};
  manualPL = {};
  sportbookPL = {}
  casinoPl = [];
  fancy_pl = [];
  binary_pl = {}
  lotteryPl = [];
  cardData = [];
  showCard = false;
  fancyInfo: any;
  binaryInfo: any;
  bookieRunner: any;
  casinoData: any;
  manualData: any;
  betfairData: any;
  sportbookdataavailable: any;
  manualIndex;
  bookieMarketName: string;
  timeRemaining: any;
  counter: number = 0;
  counterSexy: number = 0;
  countDownLottery: number;
  casinoRes: any;
  bikiRecResult: any;
  lotteryFlag = 1;
  sexyFlag = 1;
  public marketName;
  public currentMarketRes = '';
  casinoSingleRes: any;
  lotteryResult: any;
  allMarketCasinoRes: any;
  public lotteryRecResult = [];

  public sportbookData: any;
  isCasino: boolean = false;
  sexyCasinoData: any;
  gamesexyinfo: boolean = false;
  selectedOddsCasino;
  eventName: string;

  firebaseDisable: any;
  viewMode3 = 'tab1';
  stackButtonArry = STACK_VALUE;
  private a = [{
    increment: 0.01,
    lowerBound: 1.01,
    upperBound: 2
  }, {
    increment: 0.02,
    lowerBound: 2,
    upperBound: 3
  }, {
    increment: 0.05,
    lowerBound: 3,
    upperBound: 4
  }, {
    increment: 0.1,
    lowerBound: 4,
    upperBound: 6
  }, {
    increment: 0.2,
    lowerBound: 6,
    upperBound: 10
  }, {
    increment: 0.5,
    lowerBound: 10,
    upperBound: 20
  }, {
    increment: 1,
    lowerBound: 20,
    upperBound: 30
  }, {
    increment: 2,
    lowerBound: 30,
    upperBound: 50
  }, {
    increment: 5,
    lowerBound: 50,
    upperBound: 100
  }, {
    increment: 10,
    lowerBound: 100,
    upperBound: 1000
  }];
  public intrvlComment: number;
  public intrvlAllPL: number;
  public casinoFlag = 1;
  public chispselected;
  public chipsName;

  playerBetTotal: number = 0;
  playerOddBetTotal: number = 0;
  playerEvenBetTotal: number = 0;
  bankerBetTotal: number = 0;
  tieBetTotal: number = 0;
  bankerOddBetTotal: number = 0;
  bankerEvenBetTotal: number = 0;
  totalUserBetBiki: number = 0;
  isMaintance = false;
  generalRules = [];
  cardSelectionArray = []
  cardMarketArray: any;
  scoreIframeURL;
  currentMarketType = 'ALL';
  currentSessionMarketType = 'ALL';
  currentSportbookMarketType = 'ALL';

  isFancySportbook = 'FANCY';
  sportName;
  isLiveStream = false;
  mySlideOptions = { items: 1, dots: true, nav: false, autoplay: true, autoplayTimeout: 5000, loop: true };
  selectedTab = 'LIVESCORE';
  oddsType;
  isScoreAvailable = false;
  cashoutValue = [];
  cashOutAPIData;
  matchMeSwitch;



  constructor(sanitizer: DomSanitizer, private spinner: NgxSpinnerService,
    private router: Router,private headerComponent:HeaderComponent,
    public toastr: ToastrManager, private route: ActivatedRoute, private commonService: AppService,
    @Inject('firebaseProjectBinary') private binaryFirebase: AngularFirestore,
    @Inject('firebaseProjectCricket') private cricketFirebase: AngularFirestore,
    @Inject('firebaseProjectSoccer') private soccerFirebase: AngularFirestore,
    @Inject('firebaseProjectTennis') private tennisFirebase: AngularFirestore,
    @Inject('firebaseProjectOther') private otherFirebase: AngularFirestore) {

    this.isLoggedIn = localStorage.getItem('accessToken');
    this.matchMeSwitch = JSON.parse(localStorage.getItem('matchMe'));

    this.routeSub = this.route.params.subscribe(params => {
      this._id = params['id'];
      this._sportid = params['sportid'];
      localStorage.setItem('currentMarketId', params['id']);
      if (this._sportid == '4') {
        this.scoreIframeURL = sanitizer.bypassSecurityTrustResourceUrl('https://allscore.xyz/cricket-score/' + this._id);
      }
      if (this._sportid == '1') {
        this.scoreIframeURL = sanitizer.bypassSecurityTrustResourceUrl('https://allscore.xyz/soccer-score/' + this._id);
      }
      if (this._sportid == '2') {
        this.scoreIframeURL = sanitizer.bypassSecurityTrustResourceUrl('https://allscore.xyz/tennis-score/' + this._id);
      }

      this.getBookieFancyData();

      if (this.isLoggedIn) {

        if (this._sportid == '4') {
          this.getBetfairDataFirebase(this.cricketFirebase);
          this.getBookmakerDataFirebase(this.cricketFirebase);
          this.getFancyDataFirebase(this.cricketFirebase);
          // this.getSportbookFirebase(this.cricketFirebase);
        } else if (this._sportid == '2') {
          this.getBetfairDataFirebase(this.tennisFirebase);
          this.getBookmakerDataFirebase(this.tennisFirebase);
          this.getFancyDataFirebase(this.tennisFirebase);
          // this.getSportbookFirebase(this.tennisFirebase);
        } else if (this._sportid == '1') {
          this.getBetfairDataFirebase(this.soccerFirebase);
          this.getBookmakerDataFirebase(this.soccerFirebase);
          this.getFancyDataFirebase(this.soccerFirebase);
          // this.getSportbookFirebase(this.soccerFirebase);
        } else if (this._sportid == '66103') {
          this.getBinaryDataFirebase(this.binaryFirebase);
          this.getBinaryMarketPL();
          // this.getBetfairDataFirebase(this.binaryFirebase);
          // this.getBookmakerDataFirebase(this.binaryFirebase);
          // this.getFancyDataFirebase(this.binaryFirebase);
          // this.getSportbookFirebase(this.binaryFirebase);
        } else {
          this.getBetfairDataFirebase(this.otherFirebase);
          this.getBookmakerDataFirebase(this.otherFirebase);
          this.getFancyDataFirebase(this.otherFirebase);
          // this.getSportbookFirebase(this.otherFirebase);
        }

      }

    });

  }


  ngOnInit(): void {

    if (this.isLoggedIn && this._sportid != '66103') {
      this.getManualMarketPL();
      this.getFancyMarketPL();
      this.getSportbookMarketPL();
      this.getBetfairMarketPL();
    }



    // if (window.innerWidth > 992) {
    //   $('.desktop-stream').show();
    // }

    if (this.isLoggedIn) {
      this.getStackButtonValue();
    }
    if (this._id == '2019824174242967' && this.isLoggedIn) {

      $('.sidebar').css("display", "none");

      $('.main').css('margin-left', "0");
      $('.main').css('margin-right', "0");
      var isMobile = false; //initiate as false
      // device detection
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
      }
      if (isMobile == false) {
        $('.aside-menu').css("display", "none");
      }

    }

  }

  ngAfterViewInit() {

    if (window.innerWidth < 992) {
      // $('.mobile-stream').css("display", "block");
    }
    //this.liveStrem();
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);

  }

  onChangeMatchMe() {
    localStorage.setItem('matchMe', JSON.stringify(this.matchMeSwitch));
  }


  getBetfairMarketPL() {

    this.commonService.getAllRecordsByPost(CONFIG.getAllMarketplURL, { eventId: this._id, sportId: this._sportid })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.allMarketPl = data.pl;

          }
        },
        error => {
          //this.toastr.errorToastr("Something went wrong please try again.");
        });
  }

  getManualMarketPL() {

    this.commonService.getAllRecordsByPost(CONFIG.getManualPLURL, { eventId: this._id, sportId: this._sportid })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.manualPL = data.pl;

          }
        },
        error => {
          //this.toastr.errorToastr("Something went wrong please try again.");
        });
  }

  getSportbookMarketPL() {

    this.commonService.getAllRecordsByPost(CONFIG.getSportbookPLURL, { eventId: this._id })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.sportbookPL = data.pl;

          }
        },
        error => {
          //this.toastr.errorToastr("Something went wrong please try again.");
        });
  }

  getFancyMarketPL() {

    this.commonService.getAllRecordsByPost(CONFIG.getFancyPlURL, { eventId: this._id })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.fancy_pl = data.fancyPl;
          }
        },
        error => {
          //this.toastr.errorToastr("Something went wrong please try again.");
        });

  }

  getBinaryMarketPL() {

    this.commonService.getAllRecordsByPost(CONFIG.getBinaryPLURL, { eventId: this._id })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.binary_pl = data.binaryPl;
          }
        },
        error => {
          //this.toastr.errorToastr("Something went wrong please try again.");
        });
  }

  setSessionMarketType(type: any) {
    this.currentSessionMarketType = type;
  }

  setSportbookMarketType(type: any) {
    this.currentSportbookMarketType = type;
  }


  // stop() {
  //   this.router.navigateByUrl('/home');
  //   this.userIdle.stopTimer();
  // }


  toggleMarket(event) {
    var a = $(event.target).next('.card-body').slideToggle("fast");
  }

  showFancyBetlimitPopup(marketid) {
    $('.fancy_info-popup').css('display', 'none');
    $('.fancy_info-popup.' + marketid).css('display', 'flex');
  }

  hidebetlimitFancyPopup() {
    $('.fancy_info-popup').css('display', 'none');
  }

  checkJursy(imgUrl) {
    if (imgUrl) {
      if (imgUrl.includes('saddle')) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }


  getFancyDataFirebase(projectDynamic: any) {

    let arry: any[] = [];

    this.fancySubscription = projectDynamic.collection('Fancy', ref => {
      return ref
        .where('exEventId', '==', this._id)
        .where('isClosed', '==', 0)
        .orderBy('sequence', 'asc')
    }).stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {
          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'added') {
            arry.push(pt)
            this.fancyInfo = arry;
            this.fancyInfo.sort(function (a, b) {
              return a.sequence - b.sequence;
            });
          }

          if (change.type == 'modified') {

            for (let i = 0; i < this.fancyInfo.length; i++) {
              if (this.fancyInfo[i].exMarketId == pt.exMarketId) {

                this.fancyInfo[i].oddsData.status = pt.oddsData.status;
                this.fancyInfo[i].oddsData.comment = pt.oddsData.comment;
                this.fancyInfo[i].oddsData.totalMatched = pt.oddsData.totalMatched;
                this.fancyInfo[i].min = pt.min;
                this.fancyInfo[i].max = pt.max;

                if (this.fancyInfo[i].news != pt.news) {
                  this.fancyInfo[i].news = pt.news
                }

                currentid = pt.exMarketId;

                $('.' + currentid + ' .back-0').removeClass('spark');
                $('.' + currentid + ' .back-1').removeClass('spark');
                $('.' + currentid + ' .back-2').removeClass('spark');

                $('.' + currentid + ' .lay-0').removeClass('spark');
                $('.' + currentid + ' .lay-1').removeClass('spark');
                $('.' + currentid + ' .lay-2').removeClass('spark');

                for (let j = 0; j < this.fancyInfo[i].oddsData.runners.length; j++) {

                  if (this.fancyInfo[i].oddsData.runners[j].selectionId == pt.oddsData.runners[j].selectionId) {

                    if (pt.oddsData.runners[j]) {

                      // UPDATE RUNNER STATUS
                      if (pt.oddsData.runners[j].status) {
                        if (this.fancyInfo[i].oddsData.runners[j].status != pt.oddsData.runners[j].status) {
                          this.fancyInfo[i].oddsData.runners[j].status = pt.oddsData.runners[j].status;
                        }
                      }

                      // UPDATE BACK PRICE & SIZE

                      if (pt.oddsData.runners[j].price.back[0]) {

                        if (this.fancyInfo[i].oddsData.runners[j].price.back[0].price != pt.oddsData.runners[j].price.back[0].price) {

                          this.fancyInfo[i].oddsData.runners[j].price.back[0].price = pt.oddsData.runners[j].price.back[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-1').addClass('spark');
                          }, 100);

                        }
                        if (this.fancyInfo[i].oddsData.runners[j].price.back[0].size != pt.oddsData.runners[j].price.back[0].size) {
                          this.fancyInfo[i].oddsData.runners[j].price.back[0].size = pt.oddsData.runners[j].price.back[0].size;
                        }
                      }



                      // UPDATE LAY PRICE & SIZE

                      if (pt.oddsData.runners[j].price.lay[0]) {

                        if (this.fancyInfo[i].oddsData.runners[j].price.lay[0].price != pt.oddsData.runners[j].price.lay[0].price) {

                          this.fancyInfo[i].oddsData.runners[j].price.lay[0].price = pt.oddsData.runners[j].price.lay[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-1').addClass('spark');
                          }, 100);

                        }
                        if (this.fancyInfo[i].oddsData.runners[j].price.lay[0].size != pt.oddsData.runners[j].price.lay[0].size) {
                          this.fancyInfo[i].oddsData.runners[j].price.lay[0].size = pt.oddsData.runners[j].price.lay[0].size;
                        }
                      }


                    }
                  }
                }

                if (pt.oddsData.status == 'SUSPEND' || pt.oddsData.status == 'BALLRUN') {

                  $('.' + currentid + ' .back-0').removeClass('select');
                  $('.' + currentid + ' .back-1').removeClass('select');
                  $('.' + currentid + ' .back-2').removeClass('select');

                  $('.' + currentid + ' .lay-0').removeClass('select');
                  $('.' + currentid + ' .lay-1').removeClass('select');
                  $('.' + currentid + ' .lay-2').removeClass('select');

                  $('.fancy-quick-tr.' + currentid).css('display', 'none');
                  $('.odd-row .extra-pf').remove();

                }

              }
            }
          }

          if (change.type == 'removed') {

            for (let i = 0; i < this.fancyInfo.length; i++) {
              if (this.fancyInfo[i].exMarketId == pt.exMarketId) {
                this.fancyInfo.splice(i, 1)
              }
            }
          }

        });
      });
  }

  getBinaryDataFirebase(projectDynamic: any) {

    let arry: any[] = [];

    this.binarySubscription = projectDynamic.collection('Binary', ref => {
      return ref
        .where('exEventId', '==', this._id)
        .where('isClosed', '==', 0)
        // .where('isSettlement', '==', 0)
        .orderBy('sequence', 'asc')
    }).stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {
          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'added') {
            arry.push(pt)
            this.binaryInfo = arry;
            this.binaryInfo.sort(function (a, b) {
              return a.sequence - b.sequence;
            });
          }

          if (change.type == 'modified') {

            for (let i = 0; i < this.binaryInfo.length; i++) {
              if (this.binaryInfo[i].exMarketId == pt.exMarketId) {

                this.binaryInfo[i].oddsData.status = pt.oddsData.status;
                this.binaryInfo[i].oddsData.comment = pt.oddsData.comment;
                this.binaryInfo[i].oddsData.totalMatched = pt.oddsData.totalMatched;
                this.binaryInfo[i].min = pt.min;
                this.binaryInfo[i].max = pt.max;

                if (this.binaryInfo[i].news != pt.news) {
                  this.binaryInfo[i].news = pt.news
                }

                currentid = pt.exMarketId;

                $('.' + currentid + ' .back-0').removeClass('spark');
                $('.' + currentid + ' .back-1').removeClass('spark');
                $('.' + currentid + ' .back-2').removeClass('spark');

                $('.' + currentid + ' .lay-0').removeClass('spark');
                $('.' + currentid + ' .lay-1').removeClass('spark');
                $('.' + currentid + ' .lay-2').removeClass('spark');

                for (let j = 0; j < this.binaryInfo[i].oddsData.runners.length; j++) {

                  if (this.binaryInfo[i].oddsData.runners[j].selectionId == pt.oddsData.runners[j].selectionId) {

                    if (pt.oddsData.runners[j]) {

                      // UPDATE RUNNER STATUS
                      if (pt.oddsData.runners[j].status) {
                        if (this.binaryInfo[i].oddsData.runners[j].status != pt.oddsData.runners[j].status) {
                          this.binaryInfo[i].oddsData.runners[j].status = pt.oddsData.runners[j].status;
                        }
                      }

                      // UPDATE BACK PRICE & SIZE

                      if (pt.oddsData.runners[j].price.back[0]) {

                        if (this.binaryInfo[i].oddsData.runners[j].price.back[0].price != pt.oddsData.runners[j].price.back[0].price) {

                          this.binaryInfo[i].oddsData.runners[j].price.back[0].price = pt.oddsData.runners[j].price.back[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-1').addClass('spark');
                          }, 100);

                        }
                        if (this.binaryInfo[i].oddsData.runners[j].price.back[0].size != pt.oddsData.runners[j].price.back[0].size) {
                          this.binaryInfo[i].oddsData.runners[j].price.back[0].size = pt.oddsData.runners[j].price.back[0].size;
                        }
                      }



                      // UPDATE LAY PRICE & SIZE

                      if (pt.oddsData.runners[j].price.lay[0]) {

                        if (this.binaryInfo[i].oddsData.runners[j].price.lay[0].price != pt.oddsData.runners[j].price.lay[0].price) {

                          this.binaryInfo[i].oddsData.runners[j].price.lay[0].price = pt.oddsData.runners[j].price.lay[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-1').addClass('spark');
                          }, 100);

                        }
                        if (this.binaryInfo[i].oddsData.runners[j].price.lay[0].size != pt.oddsData.runners[j].price.lay[0].size) {
                          this.binaryInfo[i].oddsData.runners[j].price.lay[0].size = pt.oddsData.runners[j].price.lay[0].size;
                        }
                      }


                    }
                  }
                }

                if (pt.oddsData.status == 'SUSPEND' || pt.oddsData.status == 'BALLRUN') {

                  $('.' + currentid + ' .back-0').removeClass('select');
                  $('.' + currentid + ' .back-1').removeClass('select');
                  $('.' + currentid + ' .back-2').removeClass('select');

                  $('.' + currentid + ' .lay-0').removeClass('select');
                  $('.' + currentid + ' .lay-1').removeClass('select');
                  $('.' + currentid + ' .lay-2').removeClass('select');

                  $('.fancy-quick-tr.' + currentid).css('display', 'none');
                  $('.odd-row .extra-pf').remove();

                }

              }
            }
          }

          if (change.type == 'removed') {

            for (let i = 0; i < this.binaryInfo.length; i++) {
              if (this.binaryInfo[i].exMarketId == pt.exMarketId) {
                this.binaryInfo.splice(i, 1)
              }
            }
          }

        });
      });
  }



  setMarketType(type, event) {
    this.currentMarketType = type;
    $('#naviMarketList li').removeClass('active');
    $(event.currentTarget).addClass('active');
  }


  setMarketFancySport(type, event) {
    this.isFancySportbook = type;
    $('#naviMarketType li').removeClass('active');
    $(event.currentTarget).addClass('active');
    // if (type == 'FANCY') {
    //   if (this.sportbookSubscription) {
    //     this.sportbookSubscription.unsubscribe();
    //   }
    // }
    // if (type == 'SPORTBOOK') {
    //   if (this._sportid == '4') {
    //     this.getSportbookFirebase(this.cricketFirebase);
    //   } else if (this._sportid == '2') {
    //     this.getSportbookFirebase(this.tennisFirebase);
    //   } else if (this._sportid == '1') {
    //     this.getSportbookFirebase(this.soccerFirebase);
    //   } else {
    //     this.getSportbookFirebase(this.otherFirebase);
    //   }
    // }
  }

  getBookmakerDataFirebase(projectDynamic) {

    let arry = [];
    this.bookmakerSubscription = projectDynamic.collection('Bookmakers', ref => {
      return ref
        .where('exEventId', '==', this._id)
    }).stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {

          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'added') {
            arry.push(pt)
            this.manualData = arry;
            if (!this.sportName) {
              this.sportName = arry[0] ? arry[0].sportName : ''
            }

          }

          if (change.type == 'modified') {

            for (let i = 0; i < this.manualData.length; i++) {
              if (this.manualData[i].exMarketId == pt.exMarketId) {

                this.manualData[i].oddsData.status = pt.oddsData.status;
                this.manualData[i].news = pt.news;
                this.manualData[i].oddsData.totalMatched = pt.oddsData.totalMatched;

                currentid = pt.exMarketId;


                $('.' + currentid + ' .back_1').removeClass('spark');
                $('.' + currentid + ' .back_2').removeClass('spark');
                $('.' + currentid + ' .back_3').removeClass('spark');

                $('.' + currentid + ' .lay_1').removeClass('spark');
                $('.' + currentid + ' .lay_2').removeClass('spark');
                $('.' + currentid + ' .lay_3').removeClass('spark');


                for (let j = 0; j < this.manualData[i].oddsData.runners.length; j++) {

                  if (this.manualData[i].oddsData.runners[j].selectionId == pt.oddsData.runners[j].selectionId) {

                    this.manualData[i].oddsData.runners[j].status = pt.oddsData.runners[j].status;

                    if (pt.oddsData.runners[j]) {

                      if (pt.oddsData.runners[j].price.back[0]) {

                        if (this.manualData[i].oddsData.runners[j].price.back[0].price != pt.oddsData.runners[j].price.back[0].price) {

                          this.manualData[i].oddsData.runners[j].price.back[0].price = pt.oddsData.runners[j].price.back[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_1').addClass('spark');
                          }, 100);

                        }

                        if (this.manualData[i].oddsData.runners[j].price.back[0].size != pt.oddsData.runners[j].price.back[0].size) {

                          this.manualData[i].oddsData.runners[j].price.back[0].size = pt.oddsData.runners[j].price.back[0].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_1').addClass('spark');
                          }, 100);

                        }

                      }

                      if (pt.oddsData.runners[j].price.back[1]) {

                        if (this.manualData[i].oddsData.runners[j].price.back[1].price != pt.oddsData.runners[j].price.back[1].price) {

                          this.manualData[i].oddsData.runners[j].price.back[1].price = pt.oddsData.runners[j].price.back[1].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_2').addClass('spark');
                          }, 100);

                        }

                        if (this.manualData[i].oddsData.runners[j].price.back[1].size != pt.oddsData.runners[j].price.back[1].size) {

                          this.manualData[i].oddsData.runners[j].price.back[1].size = pt.oddsData.runners[j].price.back[1].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_2').addClass('spark');
                          }, 100);

                        }

                      }

                      if (pt.oddsData.runners[j].price.back[2]) {

                        if (this.manualData[i].oddsData.runners[j].price.back[2].price != pt.oddsData.runners[j].price.back[2].price) {

                          this.manualData[i].oddsData.runners[j].price.back[2].price = pt.oddsData.runners[j].price.back[2].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_3').addClass('spark');
                          }, 100);

                        }

                        if (this.manualData[i].oddsData.runners[j].price.back[2].size != pt.oddsData.runners[j].price.back[2].size) {

                          this.manualData[i].oddsData.runners[j].price.back[2].size = pt.oddsData.runners[j].price.back[2].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back_3').addClass('spark');
                          }, 100);

                        }
                      }

                    }


                    if (pt.oddsData.runners[j].price.lay[0]) {

                      if (this.manualData[i].oddsData.runners[j].price.lay[0].price != pt.oddsData.runners[j].price.lay[0].price) {

                        this.manualData[i].oddsData.runners[j].price.lay[0].price = pt.oddsData.runners[j].price.lay[0].price;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_1').addClass('spark');
                        }, 100);

                      }

                      if (this.manualData[i].oddsData.runners[j].price.lay[0].size != pt.oddsData.runners[j].price.lay[0].size) {

                        this.manualData[i].oddsData.runners[j].price.lay[0].size = pt.oddsData.runners[j].price.lay[0].size;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_1').addClass('spark');
                        }, 100);

                      }

                    }

                    if (pt.oddsData.runners[j].price.lay[1]) {

                      if (this.manualData[i].oddsData.runners[j].price.lay[1].price != pt.oddsData.runners[j].price.lay[1].price) {

                        this.manualData[i].oddsData.runners[j].price.lay[1].price = pt.oddsData.runners[j].price.lay[1].price;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_2').addClass('spark');
                        }, 100);

                      }

                      if (this.manualData[i].oddsData.runners[j].price.lay[1].size != pt.oddsData.runners[j].price.lay[1].size) {

                        this.manualData[i].oddsData.runners[j].price.lay[1].size = pt.oddsData.runners[j].price.lay[1].size;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_2').addClass('spark');
                        }, 100);

                      }

                    }

                    if (pt.oddsData.runners[j].price.lay[2]) {

                      if (this.manualData[i].oddsData.runners[j].price.lay[2].price != pt.oddsData.runners[j].price.lay[2].price) {

                        this.manualData[i].oddsData.runners[j].price.lay[2].price = pt.oddsData.runners[j].price.lay[2].price;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_3').addClass('spark');
                        }, 100);

                      }

                      if (this.manualData[i].oddsData.runners[j].price.lay[2].size != pt.oddsData.runners[j].price.lay[2].size) {

                        this.manualData[i].oddsData.runners[j].price.lay[2].size = pt.oddsData.runners[j].price.lay[2].size;
                        setTimeout(() => {
                          $('.' + currentid + ' .lay_3').addClass('spark');
                        }, 100);

                      }
                    }

                  }


                }

                if (pt.oddsData.status == 'SUSPEND' || pt.oddsData.status == 'BALLRUN') {

                  $('.' + currentid + ' .back_1').removeClass('select');
                  $('.' + currentid + ' .back_2').removeClass('select');
                  $('.' + currentid + ' .back_3').removeClass('select');

                  $('.' + currentid + ' .lay_1').removeClass('select');
                  $('.' + currentid + ' .lay_2').removeClass('select');
                  $('.' + currentid + ' .lay_3').removeClass('select');

                  $('.fancy-quick-tr.' + currentid).css('display', 'none');

                  $('.odd-row .extra-pf').remove();

                }

              }
            }
          }

          if (change.type == 'removed') {

            for (let i = 0; i < this.manualData.length; i++) {
              if (this.manualData[i].exMarketId == pt.exMarketId) {
                this.manualData.splice(i, 1)
              }
            }
          }

        });
      });

  }

  getSportbookFirebase(projectDynamic) {

    let arry = [];
    this.sportbookSubscription = projectDynamic.collection('Sportsbook', ref => {
      return ref
        .where('exEventId', '==', this._id)
        .where('isClosed', '==', 0)
      // .where('isOffline', '==', 0)
      // .orderBy('sequence', 'asc')
    }).stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {

          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'added') {

            arry.push(pt)
            this.sportbookdataavailable = arry;
            this.sportbookdataavailable.sort(function (a, b) {
              return a.sequence - b.sequence;
            });
          }

          if (change.type == 'modified') {

            for (let i = 0; i < this.sportbookdataavailable.length; i++) {
              if (this.sportbookdataavailable[i].exMarketId == pt.exMarketId) {

                this.sportbookdataavailable[i].oddsData.status = pt.oddsData.status;
                this.sportbookdataavailable[i].oddsData.comment = pt.oddsData.comment;

                currentid = pt.exMarketId;

                for (let j = 0; j < this.sportbookdataavailable[i].oddsData.runners.length; j++) {

                  if (this.sportbookdataavailable[i].oddsData.runners[j].selectionId == pt.oddsData.runners[j].selectionId) {

                    if (this.sportbookdataavailable[i].oddsData.runners[j].status != pt.oddsData.runners[j].status) {
                      this.sportbookdataavailable[i].oddsData.runners[j].status = pt.oddsData.runners[j].status;
                    }

                    if (this.sportbookdataavailable[i].oddsData.runners[j].price.back[0].price != pt.oddsData.runners[j].price.back[0].price) {
                      this.sportbookdataavailable[i].oddsData.runners[j].price.back[0].price = pt.oddsData.runners[j].price.back[0].price;
                    }
                    if (this.sportbookdataavailable[i].oddsData.runners[j].price.back[0].size != pt.oddsData.runners[j].price.back[0].size) {
                      this.sportbookdataavailable[i].oddsData.runners[j].price.back[0].size = pt.oddsData.runners[j].price.back[0].size;
                    }

                  }
                }

                if (pt.oddsData.status == 'SUSPEND' || pt.oddsData.status == 'BALLRUN') {

                  $('.' + currentid + ' .back-1').removeClass('select');

                  $('.' + currentid + ' .lay-1').removeClass('select');

                  $('.fancy-quick-tr.' + currentid).css('display', 'none');

                  $('.odd-row .extra-pf').remove();

                }

              }
            }

            this.sportbookdataavailable.sort(function (a, b) {
              return a.sequence - b.sequence;
            });

            $('.' + currentid + ' .back-1').removeClass('spark');
            $('.' + currentid + ' .lay-1').removeClass('spark');

            setTimeout(() => {
              $('.' + currentid + ' .back-1').addClass('spark');
              $('.' + currentid + ' .lay-1').addClass('spark');
            }, 100);


          }


          if (change.type == 'removed') {

            for (let i = 0; i < this.sportbookdataavailable.length; i++) {
              if (this.sportbookdataavailable[i].exMarketId == pt.exMarketId) {
                this.sportbookdataavailable.splice(i, 1)
              }
            }

          }

        });
      });

  }

  getBetfairDataFirebase(fireAdd) {

    let arry = [];

    this.firebaseDisable = fireAdd.collection('Betfair', ref => {
      return ref
        .where('exEventId', '==', this._id)
    }).stateChanges()
      .subscribe(changes => {
        changes.forEach(change => {

          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'added') {
            arry.push(pt)
            this.betfairData = arry;
            this.sportName = arry[0] ? arry[0].sportName : ''
          }

          if (change.type == 'modified') {

            for (let i = 0; i < this.betfairData.length; i++) {
              if (this.betfairData[i].exMarketId == pt.exMarketId) {

                this.betfairData[i].oddsData.status = pt.oddsData.status;
                this.betfairData[i].oddsData.totalMatched = pt.oddsData.totalMatched;
                this.betfairData[i].min = pt.min;
                this.betfairData[i].max = pt.max;

                currentid = pt.exMarketId;

                $('.' + currentid + ' .back-1').removeClass('spark');
                $('.' + currentid + ' .back-2').removeClass('spark');
                $('.' + currentid + ' .back-3').removeClass('spark');

                $('.' + currentid + ' .lay-1').removeClass('spark');
                $('.' + currentid + ' .lay-2').removeClass('spark');
                $('.' + currentid + ' .lay-3').removeClass('spark');


                for (let j = 0; j < this.betfairData[i].oddsData.runners.length; j++) {

                  if (this.betfairData[i].oddsData.runners[j].selectionId == pt.oddsData.runners[j].selectionId) {

                    if (pt.oddsData.runners[j]) {


                      // UPDATE BACK PRICE & SIZE

                      if (pt.oddsData.runners[j].price.back[0]) {

                        if (this.betfairData[i].oddsData.runners[j].price.back[0].price != pt.oddsData.runners[j].price.back[0].price) {

                          this.betfairData[i].oddsData.runners[j].price.back[0].price = pt.oddsData.runners[j].price.back[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-1.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                        if (this.betfairData[i].oddsData.runners[j].price.back[0].size != pt.oddsData.runners[j].price.back[0].size) {

                          this.betfairData[i].oddsData.runners[j].price.back[0].size = pt.oddsData.runners[j].price.back[0].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-1.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                      }



                      if (pt.oddsData.runners[j].price.back[1]) {

                        if (this.betfairData[i].oddsData.runners[j].price.back[1].price != pt.oddsData.runners[j].price.back[1].price) {

                          this.betfairData[i].oddsData.runners[j].price.back[1].price = pt.oddsData.runners[j].price.back[1].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-2.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                        if (this.betfairData[i].oddsData.runners[j].price.back[1].size != pt.oddsData.runners[j].price.back[1].size) {

                          this.betfairData[i].oddsData.runners[j].price.back[1].size = pt.oddsData.runners[j].price.back[1].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-2.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                      }


                      if (pt.oddsData.runners[j].price.back[2]) {

                        if (this.betfairData[i].oddsData.runners[j].price.back[2].price != pt.oddsData.runners[j].price.back[2].price) {

                          this.betfairData[i].oddsData.runners[j].price.back[2].price = pt.oddsData.runners[j].price.back[2].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-3.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);
                        }
                        if (this.betfairData[i].oddsData.runners[j].price.back[2].size != pt.oddsData.runners[j].price.back[2].size) {

                          this.betfairData[i].oddsData.runners[j].price.back[2].size = pt.oddsData.runners[j].price.back[2].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .back-3.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);
                        }
                      }

                      // UPDATE LAY PRICE & SIZE

                      if (pt.oddsData.runners[j].price.lay[0]) {

                        if (this.betfairData[i].oddsData.runners[j].price.lay[0].price != pt.oddsData.runners[j].price.lay[0].price) {

                          this.betfairData[i].oddsData.runners[j].price.lay[0].price = pt.oddsData.runners[j].price.lay[0].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-1.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                        if (this.betfairData[i].oddsData.runners[j].price.lay[0].size != pt.oddsData.runners[j].price.lay[0].size) {

                          this.betfairData[i].oddsData.runners[j].price.lay[0].size = pt.oddsData.runners[j].price.lay[0].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-1.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                      }

                      if (pt.oddsData.runners[j].price.lay[1]) {
                        if (this.betfairData[i].oddsData.runners[j].price.lay[1].price != pt.oddsData.runners[j].price.lay[1].price) {

                          this.betfairData[i].oddsData.runners[j].price.lay[1].price = pt.oddsData.runners[j].price.lay[1].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-2.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                        if (this.betfairData[i].oddsData.runners[j].price.lay[1].size != pt.oddsData.runners[j].price.lay[1].size) {

                          this.betfairData[i].oddsData.runners[j].price.lay[1].size = pt.oddsData.runners[j].price.lay[1].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-2.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                      }

                      if (pt.oddsData.runners[j].price.lay[2]) {
                        if (this.betfairData[i].oddsData.runners[j].price.lay[2].price != pt.oddsData.runners[j].price.lay[2].price) {

                          this.betfairData[i].oddsData.runners[j].price.lay[2].price = pt.oddsData.runners[j].price.lay[2].price;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-3.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                        if (this.betfairData[i].oddsData.runners[j].price.lay[2].size != pt.oddsData.runners[j].price.lay[2].size) {

                          this.betfairData[i].oddsData.runners[j].price.lay[2].size = pt.oddsData.runners[j].price.lay[2].size;
                          setTimeout(() => {
                            $('.' + currentid + ' .lay-3.' + pt.oddsData.runners[j].selectionId).addClass('spark');
                          }, 100);

                        }
                      }
                    }
                  }
                }

                if (pt.oddsData.status == 'SUSPEND' || pt.oddsData.status == 'BALLRUN') {
                  this.hideBetSection()
                }
              }
            }
          }

          if (change.type == 'removed') {

            for (let i = 0; i < this.betfairData.length; i++) {
              if (this.betfairData[i].exMarketId == pt.exMarketId) {
                this.betfairData.splice(i, 1)
              }
            }

          }

        });
      });


  }

  plusStackValue() {
    this.stackModal = this.stackModal * 2;
  }
  minusStackValue() {
    if (this.stackModal / 2 > 0) {
      this.stackModal = this.stackModal / 2;
    }
  }


  showSportbook() {
    $('.fancy-card').hide();
    $('.sprt-card').show();
    this.isFancySportbook = 'SPORTBOOK';

    if (this.isLoggedIn) {

      if (this._sportid == '4') {
        this.getSportbookFirebase(this.cricketFirebase);
      } else if (this._sportid == '2') {
        this.getSportbookFirebase(this.tennisFirebase);
      } else if (this._sportid == '1') {
        this.getSportbookFirebase(this.soccerFirebase);
      }
      // else if (this._sportid == '66103') {
      //   this.getSportbookFirebase(this.binaryFirebase);
      // }
      else {
        this.getSportbookFirebase(this.otherFirebase);
      }
    }


  }

  showFancyData() {
    $('.sprt-card').hide();
    $('.fancy-card').show();
    this.isFancySportbook = 'FANCY';

    if (this.isLoggedIn) {
      if (this.sportbookSubscription) {
        this.sportbookSubscription.unsubscribe();
      }
    }


  }

  getBetlimitCurrencyBetfair(min, max) {
    return min / 10 + '-' + max;
  }

  getBetlimitCurrency(min, max) {
    return min / 10 + '-' + max;

  }

  getBetlimitCurrencyFancyBinary(min, max) {
    return min / 10 + '-' + max;
  }

  getVolumeCurrency(volume) {
    return volume;
  }

  getClassByValue(val) {

    if (val % 2 == 0) {
      return 'even';
    } else {
      return 'odd';
    }

  }

  getTextByValue(val) {
    if (val % 2 == 0) {
      return 'Even';
    } else {
      return 'Odd';
    }
  }

  collapsed(event: any): void {
    if (this.isCollapsed) {
      this.getStremURL();
    } else {
      var video = <HTMLVideoElement>document.getElementById('remoteVideo');
      if (video) {
        $("#remoteVideo")[0].pause();
      }
    }

  }

  getStremURL() {

    this.commonService.getAllRecordsByPost(CONFIG.videoStreamURL, { eventId: this._id })
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            if (data.data) {
              // $('.mobile-stream').css("display", "block");
              let videoURL = data.data.url;
              let stream = data.data.streamingName;
              if (data.data.streamingName) {
                this.isLiveStream = true;
              } else {
                this.isLiveStream = false;
              }
              if (this.selectedTab == 'WATCHLIVE') {
                if (stream == 'true') {

                  setTimeout(() => {
                    var video = <HTMLVideoElement>document.getElementById('remoteVideoMobile');
                    if (Hls.isSupported()) {
                      var hls = new Hls();
                      hls.loadSource(videoURL);
                      hls.attachMedia(video);
                      hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        video.play();
                      });
                    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                      video.src = videoURL;
                      video.addEventListener("canplay", function () {
                        video.play();
                      });
                    }
                  })

                } else {

                  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                  var webrtcPlayer = null;
                  webrtcPlayer = new T20RTCPlayer("remoteVideoMobile", stream, "", videoURL, "443", true, true, "tcp");
                  webrtcPlayer.Play();
                }
              }

            }
          }
        },
        error => {
          console.log(error);
        });


  }

  changeTab(currentTab) {
    this.selectedTab = currentTab;
    // if (currentTab == 'LIVESCORE') {
    //   this.getScoreDataFirebase();
    // } else {
    //   this.objectSubscription.unsubscribe();
    // }

    if (currentTab == 'WATCHLIVE') {
      this.getStremURL();
      // var mediaVideo = $("#remoteVideoMobile").get(0);
      // mediaVideo.play();
    } else {
      var mediaVideo = $("#remoteVideoMobile").get(0);
      if (mediaVideo) {
        mediaVideo.pause();
      }

    }

  }

  expanded(event: any): void {

  }

  upValue() {

    let c = this.oddsModal;
    let increment;

    if (c >= this.a[9].upperBound) {
      increment = this.a[9].increment;
    }
    for (var b = 0; b < this.a.length; b++) {
      if ((c >= this.a[b]["lowerBound"]) && (c < this.a[b]["upperBound"])) {
        increment = this.a[b].increment;
      }
    }

    let newVal = Number(this.oddsModal) + increment;
    this.oddsModal = newVal.toFixed(2);
    this.getProfitOnInputChange();
  }

  downValue() {

    let c = this.oddsModal;
    let increment;
    if (c >= this.a[9].upperBound) {
      return this.a[9]
    }
    for (var b = 0; b < this.a.length; b++) {
      if ((c > this.a[b]["lowerBound"]) && (c <= this.a[b]["upperBound"])) {
        increment = this.a[b].increment;
      }
    }

    if (this.oddsModal <= 1.01) {
      this.oddsModal = this.oddsModal;
    } else {
      let newVal = Number(this.oddsModal) - increment;
      this.oddsModal = newVal.toFixed(2);
    }
    this.getProfitOnInputChange();
    return '';
  }

  openGeneralRules() {

    this.commonService.getAllRecordsByPost(CONFIG.getRulesOfMarketURL, { sportId: this._sportid })
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {

            if (data.data) {
              this.generalRules = data.data.rules;
            } else {
              this.generalRules = [];
            }

          }
        },
        error => {
          let responseData = error;
          if (responseData.error) {
            this.toastr.errorToastr(responseData.error.meta.message);
          } else {
            console.error(error);
          }
        });

    // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openModal(marketId) {

    this.marketId = marketId;
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/client/login');
      return;
    } else {
      this.getFancyBookList();
      // this.modalRef = this.modalService.show(template, { class: cls });
    }


  }

  openCasinoResultModal(template: TemplateRef<any>, result) {

    this.casinoSingleRes = result;

    if (result.result) {
      this.allMarketCasinoRes = result.result;
    }

    // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openCardRaceResultModal(template: TemplateRef<any>, result) {
    this.casinoSingleRes = result;
    if (result.result) {
      this.allMarketCasinoRes = result;
    }
    // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openLotteryResultModal(template: TemplateRef<any>, result) {
    this.lotteryResult = result;
    // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  getLocalTime(date) {
    var res = new Date(date);
    return moment(res, "MM-DD-YYYY").format('DD-MM-YYYY');
  }

  openModalBet(oddsType: string, price, backlayCLs, name, marketIds, selectionId, type, manual_index) {
    let loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    // if (loggedUserData) {
    //   this.getStackButtonValue();
    // }
    this.oddsType = oddsType;
    this.oddsModal = price;
    this.stackModal = 0;
    this.stackCalculateProfit = 0;
    this.totalProfit = 0;
    this.betFor = name;
    this.backLayClsModal = backlayCLs;
    this.marketId = marketIds;
    this.selectionId = selectionId;

    this.betType = type;

    $('.fancy-quick-tr').css('display', 'none');

    $('.back-1').removeClass('select');
    $('.back-2').removeClass('select');
    $('.back-3').removeClass('select');

    $('.lay-1').removeClass('select');
    $('.lay-2').removeClass('select');
    $('.lay-3').removeClass('select');

    $('.back_1').removeClass('select');
    $('.back_2').removeClass('select');
    $('.back_3').removeClass('select');

    $('.lay_1').removeClass('select');
    $('.lay_2').removeClass('select');
    $('.lay_3').removeClass('select');

    // $('.' + marketIds + '.' + selectionId).css('display', 'table-row');
    $('.fancy-quick-tr.' + marketIds + '.' + selectionId).css('display', 'table-row');

    let seq;
    if (manual_index == 0) {
      seq = '1';
    } else if (manual_index == 1) {
      seq = '2';
    } else {
      seq = '3';
    }

    if (backlayCLs == 'slip-back') {
      $('.' + marketIds + ' ' + '.back-' + seq + '.' + selectionId).addClass('select');
    } else {
      $('.' + marketIds + ' ' + '.lay-' + seq + '.' + selectionId).addClass('select');
    }


  }

  convertUTCDate(date) {
    var res = new Date(date);
    return moment(res).format('DD-MM-YYYY HH:mm');
  }

  removeDecimalPoint(number) {
    return number.toFixed(1);
  }


  getStackButtonValue() {
    this.commonService.getAllRecordsByPost(CONFIG.userGetStackURL, {})
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {
            if (data.data) {
              if (data.data.stake.length > 0) {
                this.stackButtonArry = data.data.stake ? data.data.stake : STACK_VALUE;
              }
            }
          }
        },
        error => {
          let responseData = error;
          if (responseData.error) {
            this.toastr.errorToastr(responseData.error.meta.message);
          } else {
            console.error(error);
          }
        });
  }


  openModalFancyBet(oddsType: string, modalClr, oddsPrice, marketName, marketIds, rateOrId, type, manual_index) {

    let loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    // if (loggedUserData) {
    //   this.getStackButtonValue();
    // }
    this.oddsType = oddsType,
      this.backLayClsModal = modalClr;
    this.oddsModal = oddsPrice;
    this.stackModal = 0;
    this.stackCalculateProfit = 0;
    this.totalProfit = 0;
    this.betFor = marketName;
    this.marketId = marketIds;
    this.selectionId = rateOrId;
    this.betType = type;
    this.fancyRate = rateOrId;
    this.manualIndex = manual_index;
    $('.fancy-quick-tr').css('display', 'none');
    $('.odd-row .extra-pf').remove();

    $('.back-1').removeClass('select');
    $('.back-2').removeClass('select');
    $('.back-3').removeClass('select');
    $('.lay-1').removeClass('select');
    $('.lay-2').removeClass('select');
    $('.lay-3').removeClass('select');

    $('.back_1').removeClass('select');
    $('.back_2').removeClass('select');
    $('.back_3').removeClass('select');
    $('.lay_1').removeClass('select');
    $('.lay_2').removeClass('select');
    $('.lay_3').removeClass('select');


    if (type == 'SPORTBOOK' || type == 'CASINO') {
      // $('.' + marketIds + '.' + rateOrId).css('display', 'table-row');
      $('.fancy-quick-tr.' + marketIds + '.' + rateOrId).css('display', 'table-row');
      if (modalClr == 'slip-back') {
        $('.' + marketIds + ' ' + '.back-1.' + rateOrId).addClass('select');
      } else {
        $('.' + marketIds + ' ' + '.lay-1.' + rateOrId).addClass('select');
      }
    }
    else if (type == 'BOOKIE') {


      // $('.' + marketIds + '.' + rateOrId).css('display', 'table-row');
      $('.fancy-quick-tr.' + marketIds + '.' + rateOrId).css('display', 'table-row');

      let seq;
      if (manual_index == 0) {
        seq = '1';
      } else if (manual_index == 1) {
        seq = '2';
      } else {
        seq = '3';
      }

      if (modalClr == 'slip-back') {

        $('.' + marketIds + ' ' + '.back_' + seq + '.' + rateOrId).addClass('select');
      } else {
        $('.' + marketIds + ' ' + '.lay_' + seq + '.' + rateOrId).addClass('select');
      }
    }
    else {
      $('.fancy-quick-tr.' + marketIds).css('display', 'table-row');
      if (modalClr == 'slip-back') {
        $('.back-1.' + marketIds).addClass('select');
      } else {
        $('.lay-1.' + marketIds).addClass('select');
      }
    }


  }

  hideBetSection() {
    $('.back-1').removeClass('select');
    $('.back-2').removeClass('select');
    $('.back-3').removeClass('select');

    $('.lay-1').removeClass('select');
    $('.lay-2').removeClass('select');
    $('.lay-3').removeClass('select');

    $('.back_1').removeClass('select');
    $('.back_2').removeClass('select');
    $('.back_3').removeClass('select');

    $('.lay_1').removeClass('select');
    $('.lay_2').removeClass('select');
    $('.lay_3').removeClass('select');

    $('.fancy-quick-tr').css('display', 'none');
    $('.odd-row .extra-pf').remove();

  }

  decline(): void {
    this.modalRef.hide();
  }

  declineBetModal(): void {
    this.modalRefBet.hide();
    window.clearInterval(this.intrvlBackLay);
  }

  reset() {
    this.stackModal = 0;
    this.stackCalculateProfit = 0;
    this.getProfitOnInputChange();
  }


  getBookieFancyData() {
    this.spinner.show();

    this.commonService.getAllRecordsByPost(CONFIG.getbookieFancyDataURL, { eventId: this._id, sportId: this._sportid })
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();

          if (data.data) {
            this.fancyInfo = data.data.fancyData;
            this.manualData = data.data.bookmakersData;
            this.betfairData = data.data.matchOddsData;

            if (this.betfairData[0]) {
              this.eventName = this.betfairData[0].eventName;
            } else {
              this.eventName = this.manualData[0].eventName;
            }
            this.sportbookdataavailable = data.data.sportsbookData;
            this.isScoreAvailable = data.data.isScore;
            if (data.data.binaryData) {
              this.binaryInfo = data.data.binaryData;
            }
          }
        },
        error => {
          this.spinner.hide();
          console.error("Something went wrong please try again.");
        });
  }

  getLocalDateTime(date: Date) {
    if (date) {
      var res = new Date(date);
      return moment(res, "D MM YYYY hh:mm:ss A").format('D/MM/YYYY hh:mm:ss A');
    } else {
      return '';
    }
  }



  reloadData() {
    window.location.reload();
  }

  getFancyBookList() {

    this.commonService.getAllRecordsByPost(CONFIG.fancyBookListByMarketURL, { marketId: this.marketId, sportId: this._sportid })
      .pipe(first())
      .subscribe(
        data => {
          this.fancyBookListData = [];
          if (data.meta.status == true) {

            let finalData = [];
            if (data.data) {
              for (let key in data.data) {
                finalData.push({ 'run': key, 'amount': data.data[key] });
              }
            }

            this.fancyBookListData = finalData;
          }
        },
        error => {
          this.fancyBookListData = [];
          console.error("No fancy book data");
        });
  }

  updateStack(value, marketId, selectionId) {

    this.stackModal = value;

    if (this.betType == 'FANCY' || this.betType == 'LOTTERY') {
      return;
    }

    if (this.backLayClsModal == 'slip-lay') {

      let cal = (this.oddsModal * 100) - 100;
      this.totalProfit = Math.ceil((cal / 100) * this.stackModal);

      $('.odd-row.' + marketId).each(function (i, obj) {
        let oldvalue = $(obj).find("span").eq(0).html();
        let spiltted = oldvalue.split("i>")

        let finalres = Math.abs(value) + parseInt(spiltted[1])

        $(obj).find("span .extra-pf").remove();

        $(obj).find("span").eq(0).append("<span class='extra-pf'>(" + finalres.toFixed(2) + ')</span>')

        if (finalres > 0) {
          $(obj).find("span .extra-pf").addClass('plus-book');
        } else {
          $(obj).find("span .extra-pf").addClass('minus-book');
        }
      });

      var currentOldValue = $('.' + marketId + '.' + selectionId).find("span").eq(0).html();
      let spilttedcurrent = currentOldValue.split("i>")

      let afterCal = parseInt(spilttedcurrent[1]);

      let finalrescurrent = afterCal - this.totalProfit;

      $('.' + marketId + '.' + selectionId).find("span .extra-pf").remove();
      $('.' + marketId + '.' + selectionId).find("span").eq(0).append("<span class='extra-pf'>(" + finalrescurrent.toFixed(2) + ')</span>')

      if (finalrescurrent > 0) {
        $('.' + marketId + '.' + selectionId).find("span .extra-pf").addClass('plus-book');
      } else {
        $('.' + marketId + '.' + selectionId).find("span .extra-pf").addClass('minus-book');
      }


    } else {

      let cal = (this.oddsModal * 100) - 100;
      this.totalProfit = Math.ceil((cal / 100) * this.stackModal);

      $('.odd-row.' + marketId).each(function (i, obj) {
        let oldvalue = $(obj).find("span").eq(0).html();
        let spiltted = oldvalue.split("i>")

        let finalres = parseInt(spiltted[1]) - Math.abs(value)

        $(obj).find("span .extra-pf").remove();

        $(obj).find("span").eq(0).append("<span class='extra-pf'>(" + finalres.toFixed(2) + ')</span>')

        if (finalres > 0) {
          $(obj).find("span .extra-pf").addClass('plus-book');
        } else {
          $(obj).find("span .extra-pf").addClass('minus-book');
        }
      });

      var currentOldValue = $('.' + marketId + '.' + selectionId).find("span").eq(0).html();
      let spilttedcurrent = currentOldValue.split("i>")

      let afterCal = parseInt(spilttedcurrent[1]);

      let finalrescurrent = afterCal + this.totalProfit;

      $('.' + marketId + '.' + selectionId).find("span .extra-pf").remove();
      $('.' + marketId + '.' + selectionId).find("span").eq(0).append("<span class='extra-pf'>(" + finalrescurrent.toFixed(2) + ')</span>')

      if (finalrescurrent > 0) {
        $('.' + marketId + '.' + selectionId).find("span .extra-pf").addClass('plus-book');
      } else {
        $('.' + marketId + '.' + selectionId).find("span .extra-pf").addClass('minus-book');
      }

    }

  }


  calculateCashOut(exMarketId) {
    window.clearInterval(this.intrvlCashOut)
    this.cashOutOnInterval(exMarketId)
    this.intrvlCashOut = window.setInterval(() => {
      this.cashOutOnInterval(exMarketId)
    }, 1000);

  }

  cashOutOnInterval(exMarketId) {

    this.cashoutValue = []

    for (let i = 0; i < this.betfairData.length; i++) {
      if (this.betfairData[i].exMarketId == exMarketId) {

        let runnerArr = this.betfairData[i].oddsData.runners;
        let userProfitLoss = this.allMarketPl[exMarketId];

        let getOddsTeam = _.map(runnerArr, function (val) {

          let SelBackPri = val["price"]["back"][0]["price"];
          let SelLayPri = val["price"]["lay"][0]["price"];
          let getSelId = val["selectionId"];

          return {
            "selectionId": getSelId,
            "backOdds": SelBackPri,
            "layOdds": SelLayPri
          }
        });


        let getFavSelection = _.minBy(getOddsTeam, "backOdds");
        let finalFavoriteSelection = getFavSelection["selectionId"];

        if (getFavSelection["backOdds"] == 0 || getFavSelection["layOdds"] == 0) {
          this.cashoutValue = [];
          window.clearInterval(this.intrvlCashOut)
          this.toastr.errorToastr('Cash Out is not possible on this odds.')
          return;
        }

        let getFavPl = userProfitLoss[finalFavoriteSelection];

        let cashOutStake = 0;
        let resPrice = 0;
        let resSide = "";

        let getPlFilter = _.filter(userProfitLoss, function (val) {
          if (val < 0) {
            return val;
          }
        });


        if (getPlFilter.length == 2 || getPlFilter.length == 0) {
          let getOtherSel = _.omit(userProfitLoss, finalFavoriteSelection);
          let OthselectionData = _.keys(getOtherSel)[0];
          let PlProfitData = _.values(userProfitLoss);
          let subPl = Math.abs(_.subtract(PlProfitData[0], PlProfitData[1]));
          if (getFavPl > userProfitLoss[OthselectionData]) {

            cashOutStake = parseFloat(Number(subPl / getFavSelection["layOdds"]).toFixed(2));
            resPrice = getFavSelection["layOdds"];
            // console.log("profit both");
            resSide = "LAY";

          } else {

            cashOutStake = parseFloat(Number(subPl / getFavSelection["backOdds"]).toFixed(2));
            resPrice = getFavSelection["backOdds"];
            // console.log("profit both");
            resSide = "BACK";

          }
        } else {
          let getTotalPlSum = _.sumBy(_.values(userProfitLoss), function (v) { return Math.abs(v); });

          if (getFavPl > 0) {
            cashOutStake = parseFloat(Number(getTotalPlSum / getFavSelection["layOdds"]).toFixed(2));
            resPrice = getFavSelection["layOdds"];
            resSide = "LAY";
          } else {
            cashOutStake = parseFloat(Number(getTotalPlSum / getFavSelection["backOdds"]).toFixed(2));
            resPrice = getFavSelection["backOdds"];
            resSide = "BACK";
          }
        }

        let cashoutValueFinal;
        if (resSide == 'BACK') {
          let cal = (resPrice * 100) - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl + totalProfit).toFixed(2);
        }
        if (resSide == 'LAY') {
          let cal = (resPrice * 100) - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl - totalProfit).toFixed(2);
        }

        this.cashoutValue[exMarketId] = cashoutValueFinal;

        this.cashOutAPIData = {
          'marketId': exMarketId,
          'matchMe': this.matchMeSwitch ? true : false,
          'price': resPrice,
          'selectionId': finalFavoriteSelection,
          'side': resSide,
          'sportId': this._sportid,
          'stake': cashOutStake,
          'type': "MATCH_ODDS"
        }

      }
    }
  }


  onCashOutConfirm() {

    if (!this.cashOutAPIData.stake) {
      this.toastr.errorToastr("Cash Out not Possible on this Price");
      return;
    }

    this.spinner.show();

    $('.quick_bet-wrap .btn-send').prop('disabled', true);

    this.commonService.getAllRecordsByPost(CONFIG.placeBetURL, this.cashOutAPIData)
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {
            this.cashoutValue = [];
            window.clearInterval(this.intrvlCashOut)
            $('.quick_bet-wrap .btn-send').prop('disabled', false);
            this.hideBetSection();
            this.headerComponent.getBalance();
            this.getBetfairMarketPL();
            this.spinner.hide();

          }
        },
        error => {

          $('.quick_bet-wrap .btn-send').prop('disabled', false);
          this.hideBetSection();
          this.spinner.hide();

          $('.btn-placebet').prop('disabled', false);
          if (error.meta) {
            let errorObject = error.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                this.toastr.errorToastr(errorObject[key].message, '');
                return;
              }
            } else {
              this.toastr.errorToastr(errorObject, '');
              return;
            }

          } else {
            this.toastr.errorToastr('Hey, looks like something went wrong.', '');
            return;
          }

        });
  }


  getProfitOnInputChange() {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }


  placeBetBookieFancy() {

    if (this.oddsModal == null || this.oddsModal == 0) {
      this.toastr.errorToastr('Please Enter Odds.', 'Oops!');
      return;
    }
    if (this.stackModal == 0 || this.stackModal == null) {
      this.toastr.errorToastr('Please Enter Stack.', 'Oops!');
      return;
    }

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/client/login');
      return;
    }

    let data = {
      marketId: this.marketId,
      selectionId: this.selectionId,
      stake: this.stackModal,
      price: this.oddsModal,
      sportId: this._sportid,
      side: this.backLayClsModal == 'slip-lay' ? 'LAY' : 'BACK',
      matchMe: this.matchMeSwitch ? true : false,
      type: this.oddsType,
      index: this.manualIndex
    };

    if (this.betType == 'FANCY' || this.betType == 'BINARY') {
      data['size'] = this.fancyRate;
    }

    this.spinner.show();

    $('.quick_bet-wrap .btn-send').prop('disabled', true);

    this.commonService.getAllRecordsByPost(CONFIG.placeBetURL, data)
      .pipe(first())
      .subscribe(
        data => {
          if (data.meta.status == true) {

            $('.quick_bet-wrap .btn-send').prop('disabled', false);
            this.hideBetSection();

            this.headerComponent.getBalance();

            if (this.betType == 'FANCY') {
              this.getFancyMarketPL();
            }
            if (this.betType == 'BINARY') {
              this.getBinaryMarketPL();
            }
            if (this.betType == 'BOOKIE') {
              this.getManualMarketPL()
            }
            if (this.betType == 'ODDS') {
              this.getBetfairMarketPL();
            }
            if (this.betType == 'SPORTBOOK') {
              this.getSportbookMarketPL();
            }


            this.spinner.hide();

          }
        },
        error => {

          $('.quick_bet-wrap .btn-send').prop('disabled', false);
          this.hideBetSection();
          this.spinner.hide();

          $('.btn-placebet').prop('disabled', false);
          if (error.meta) {
            let errorObject = error.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                this.toastr.errorToastr(errorObject[key].message, '');
                return;
              }
            } else {
              this.toastr.errorToastr(errorObject, '');
              return;
            }

          } else {
            this.toastr.errorToastr('Hey, looks like something went wrong.', '');
            return;
          }

        });

  }

  removeDot(str) {
    if (str) {
      return str.replace('.', '');
    }

  }

  getChipClass(stackvalue) {

    let val = parseInt(stackvalue);
    if (val > 0 && val <= 1000) {
      return 'chips_1';
    } else if (val > 1000 && val <= 2000) {
      return 'chips_2';
    } else if (val > 2000 && val <= 5000) {
      return 'chips_5';
    } else if (val > 5000 && val <= 10000) {
      return 'chips_10';
    } else if (val > 10000 && val <= 20000) {
      return 'chips_20';
    } else if (val > 20000 && val <= 50000) {
      return 'chips_2';
    } else {
      return 'chips_1k';
    }
  }
  mybetsLay:any=[];
  mybetsBack:any=[];
  getEventMatchedBetList(){
    console.log('id',this._id,'sportid',this._sportid);
    this.commonService.getEventMatchedBetList(CONFIG.getEventMatchedBetList, { eventId: this._id, sportId: this._sportid })
    .pipe(first())
    .subscribe(
      (data:any )=> {
        if (data.meta.status == true) {
          this.MybetsRecord=data.data;
          this.MybetsRecord.filter((res:any)=>{
            if(res.type=='B'){
                this.mybetsBack.push(res);
            }
            else if(res.type=='L'){
              this.mybetsLay.push(res);
            }
          })

        }
      },
      error => {
        //this.toastr.errorToastr("Something went wrong please try again.");
      });
  }

  ngOnDestroy() {
    localStorage.removeItem('currentMarketId');
    // localStorage.removeItem("currentCasinoMarketId");
    this.routeSub.unsubscribe();
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }

    if (this.fancySubscription) {
      this.fancySubscription.unsubscribe()
    }
    if (this.binarySubscription) {
      this.binarySubscription.unsubscribe()
    }
    if (this.sportbookSubscription) {
      this.sportbookSubscription.unsubscribe()
    }
    window.clearInterval(this.intrvl);
    window.clearInterval(this.intrvlCashOut);
    window.location.reload();
  }

}
