import { NgModule, PLATFORM_ID, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppService } from './services/app.service';
import { DataTablesModule } from "angular-datatables";
import { AngularFirestoreBinary, AngularFirestoreCricket, AngularFirestoreSoccer, AngularFirestoreTennis, AngularFirestoreOther } from './services/firebase.service';
import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import {AuthServiceService} from "./services/auth-service.service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ShortNumberPipe
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxIntlTelInputModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfigCricket),
  ],
  providers: [
    AppService,
    AuthServiceService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'firebaseProjectBinary',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreBinary
    },
    {
      provide: 'firebaseProjectCricket',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreCricket
    },
    {
      provide: 'firebaseProjectSoccer',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreSoccer
    },
    {
      provide: 'firebaseProjectTennis',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreTennis
    },
    {
      provide: 'firebaseProjectOther',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreOther
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
