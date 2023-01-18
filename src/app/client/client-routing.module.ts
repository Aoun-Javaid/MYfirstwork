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

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'market-details/:id/:sportid', component: MarketDetailsComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'edit-password', component: EditPasswordComponent
      },
      {
        path: 'statement', component: StatementComponent
      },
      {
        path: 'inplay', component: InplayComponent
      },
      {
        path: 'detail', component: DetailsComponent
      },
      {
        path: 'profitloss', component: ProfitlossComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'withdraw', component: WithdrawComponent
      },
      {
        path: 'deposit', component: DepositComponent
      },
      {
        path: 'bet-history', component: BetHistoryComponent
      },
      {
        path: 'add-paymentMethod', component: AddPaymentMethodComponent
      },
       {
        path: 'passwordHistory', component: PasswordHistoryComponent
      },
      {
        path: 'profitloss-event', component: ProfitlossEventComponent
      },

      {
        path: 'profitloss-market', component: ProfitlossMarketComponent
      },

      {
        path: 'd-profit-history', component: DProfitHistoryComponent
      },{
        path: 'bonus', component: BonusComponent
      },
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
