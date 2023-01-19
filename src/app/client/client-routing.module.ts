import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {MarketDetailsComponent} from "./pages/market-details/market-details.component";
import {ProfileComponent} from './pages/profile/profile.component';
import {EditPasswordComponent} from './pages/edit-password/edit-password.component';
import {StatementComponent} from './pages/statement/statement.component';
import {InplayComponent} from "./pages/inplay/inplay.component";
import {DetailsComponent} from './pages/statement-details/details.component';
import {ProfitlossComponent} from './pages/profitloss/profitloss.component';
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawComponent} from "./pages/withdraw/withdraw.component";
import {DepositComponent} from "./pages/deposit/deposit.component";
import {BetHistoryComponent} from './pages/bet-history/bet-history.component';
import {AddPaymentMethodComponent} from './pages/add-payment-method/add-payment-method.component';
// import {PasswordHistoryComponent} from "./pages/password-history/password-history.component";
import { ProfitlossEventComponent } from './pages/profitloss-event/profitloss-event.component';
import { ProfitlossMarketComponent } from './pages/profitloss-market/profitloss-market.component';
import { DProfitHistoryComponent } from './pages/d-profit-history/d-profit-history.component';
import {PasswordHistoryComponent} from "./pages/password-history/password-history.component";
import {BonusComponent} from "./pages/bonus/bonus.component";
import {AuthGuardGuard} from "../guard/auth-guard.guard";
import {HorseRacingComponent} from "./pages/horse-racing/horse-racing.component";
import { CasinoInternationalComponent } from './pages/casino-international/casino-international.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'market-details/:id/:sportid', component: MarketDetailsComponent
      },
      {
        path: 'profile', component: ProfileComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'edit-password', component: EditPasswordComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'statement', component: StatementComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'inplay', component: InplayComponent
      },
      {
        path: 'detail', component: DetailsComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'profitloss', component: ProfitlossComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'settings', component: SettingsComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'withdraw', component: WithdrawComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'deposit', component: DepositComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'bet-history', component: BetHistoryComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'add-paymentMethod', component: AddPaymentMethodComponent,canActivate:[AuthGuardGuard]
      },
       {
        path: 'passwordHistory', component: PasswordHistoryComponent,canActivate:[AuthGuardGuard]
      },
      {
        path: 'profitloss-event/:id/:startDate/:endDate/:dataSource', component: ProfitlossEventComponent,canActivate:[AuthGuardGuard]
      },

      {
        path: 'profitloss-market/:eventId/:dataSource', component: ProfitlossMarketComponent,canActivate:[AuthGuardGuard]
      },

      {
        path: 'd-profit-history/:sportId/:marketId/:dataSource', component: DProfitHistoryComponent,canActivate:[AuthGuardGuard]
      },{
        path: 'bonus', component: BonusComponent,canActivate:[AuthGuardGuard]
      },
      {
        path:'horse-racing',component:HorseRacingComponent
      },
      {
        path:'casinoInternational',component:CasinoInternationalComponent
      }
      // {
      //   path: 'result',component:ResultComponent
      // },
      // {
      //   path: 'RequestStatus',component:RequestStatusComponent
      // }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
