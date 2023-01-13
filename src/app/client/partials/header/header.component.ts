import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideBarOpen = false;
  isRightBarOpen = false;
  isLogin=true;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {
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

}
