import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { BottomNavComponent } from './partials/bottom-nav/bottom-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MarketsComponent } from './pages/dashboard/markets/markets.component';
import { CasinoComponent } from './pages/dashboard/casino/casino.component';

import {SignupComponent} from './auth/signup/signup.component';
import { MarketDetailsComponent } from './pages/market-details/market-details.component';
import { SidenavComponent } from './partials/sidenav/sidenav.component';



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    DashboardComponent,
    MarketsComponent,
    CasinoComponent,
    DashboardComponent,

    SignupComponent,
      MarketDetailsComponent,
      SidenavComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ]
})
export class ClientModule {
}
