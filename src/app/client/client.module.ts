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
import { ProfileComponent } from './pages/profile/profile.component';
import { RightNavComponent } from './partials/right-nav/right-nav.component';
import {LoginComponent} from "./auth/login/login.component";
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { StatementComponent } from './pages/statement/statement.component';
import { InplayComponent } from './pages/inplay/inplay.component';
import { DetailsComponent } from './pages/statement-details/details.component';
import { ProfitlossComponent } from './pages/profitloss/profitloss.component';
import { BetslipComponent } from './partials/betslip/betslip.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';



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
    LoginComponent,
    SignupComponent,
      MarketDetailsComponent,
      SidenavComponent,
      ProfileComponent,
      RightNavComponent,
      EditPasswordComponent,
      StatementComponent,
      InplayComponent,
      DetailsComponent,
      ProfitlossComponent,
      BetslipComponent,
      SettingsComponent,
      DepositComponent,
      WithdrawComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ]
})
export class ClientModule {
}
