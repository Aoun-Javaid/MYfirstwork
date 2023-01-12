import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {MarketDetailsComponent} from "./pages/market-details/market-details.component";
import { ProfileComponent } from './pages/profile/profile.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { StatementComponent } from './pages/statement/statement.component';
import {InplayComponent} from "./pages/inplay/inplay.component";
import { DetailsComponent } from './pages/statement-details/details.component';
import { ProfitlossComponent } from './pages/profitloss/profitloss.component';
import {SettingsComponent} from "./pages/settings/settings.component";
import {WithdrawComponent} from "./pages/withdraw/withdraw.component";
import {DepositComponent} from "./pages/deposit/deposit.component";
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { ResultComponent } from './pages/result/result.component';
import { RequestStatusComponent } from './pages/request-status/request-status.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'market-details',component:MarketDetailsComponent
      },
      {
        path: 'profile',component:ProfileComponent
      },
      {
        path: 'edit-password',component:EditPasswordComponent
      },
      {
        path: 'statement',component:StatementComponent
      },
      {
        path: 'inplay',component:InplayComponent
      },
      {
        path: 'detail',component:DetailsComponent
      },
      {
        path: 'profitloss',component:ProfitlossComponent
      },
      {
        path: 'settings',component:SettingsComponent
      },
      {
        path: 'withdraw',component:WithdrawComponent
      },
      {
        path: 'deposit',component:DepositComponent
      },
      {
        path: 'bet-history',component:BetHistoryComponent
      },
      {
        path: 'result',component:ResultComponent
      },
      {
        path: 'RequestStatus',component:RequestStatusComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
