import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {MarketDetailsComponent} from "./pages/market-details/market-details.component";
import { ProfileComponent } from './pages/profile/profile.component';

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
