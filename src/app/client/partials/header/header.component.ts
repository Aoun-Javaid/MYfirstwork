import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideBarOpen = false;
  isRightBarOpen = false;
  isLogin=false;
  userbalance:any;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef,private appService:AppService) {
  }
  ngOnInit(): void {
    this.appService.getLoggedIn().subscribe((res:any)=>{
        this.isLogin=res;
    });
    if(localStorage.getItem('accessToken')){
      this.appService.setLoggedIn(true);
    }
    else{
      this.appService.setLoggedIn(false);
    }
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isSideBarOpen = false
      this.clickOutside.emit();
    }

    if(target.className=="waves-effect waves-light sideNavCheck")
    {
      this.isSideBarOpen = false
    }

  }

  sidenavOpen() {
    if (!this.isSideBarOpen) {
      document.body.className += ' left-bar-enabled';
      this.isSideBarOpen = true;
    } else {
      document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
      this.isSideBarOpen = false;
    }
  }
  getBalance(){
    this.appService.getUserBalance().subscribe((res:any)=>{
      console.log(res);
      this.userbalance=res.data;
      this.appService.setbalance(this.userbalance);
    })
  }

}
