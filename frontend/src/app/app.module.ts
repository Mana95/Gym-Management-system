//import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { ResponseresetpasswordComponent } from './responseresetpassword/responseresetpassword.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { WebpageComponent } from './webpage/webpage.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import { ConfirmMessageComponent } from './message/confirm-message/confirm-message.component';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          FlatpickrModule.forRoot()
         
    ],
    declarations: [AppComponent, PasswordchangeComponent, ResponseresetpasswordComponent, ConfirmMessageComponent],
    entryComponents:[ConfirmMessageComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
