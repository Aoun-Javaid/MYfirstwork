import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { JwtinterceptorService } from './services/JwtInterceptor.service';
import { AppService } from './services/app.service';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxIntlTelInputModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
