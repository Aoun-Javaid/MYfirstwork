import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {HeaderComponent} from './partials/header/header.component';
import {FooterComponent} from './partials/footer/footer.component';
import {BottomNavComponent} from './partials/bottom-nav/bottom-nav.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

import {SignupComponent} from './auth/signup/signup.component';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    DashboardComponent,

    SignupComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule {
}
