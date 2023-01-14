import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {
  isRightBarOpen = false;
  customerSuport: any = [];
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private appService: AppService) {
  }
  
  ngOnInit(): void {
    this.getCustomerSupport();

  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isRightBarOpen = false
      this.clickOutside.emit();
    }
    if(target.className=="waves-effect waves-light sideNavCheck")
    {
      this.isRightBarOpen = false

    }

  }


  // showRightNav() {
  //   this.isRightBarOpen = true;
  // }

  sidenavOpen() {
    debugger
    if (!this.isRightBarOpen) {
      document.body.className += ' left-bar-enabled';
      this.isRightBarOpen = true;
    } else {
      document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
      this.isRightBarOpen = false;
    }
  }

  getCustomerSupport() {
    this.appService.getCustomerSupport().subscribe(data => {
      if (data.data)
        this.customerSuport = data.data;
    })
  }
}
