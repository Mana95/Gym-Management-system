import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MembershipPaymentComponent } from '../getmembership/request-member-status/membership-payment/membership-payment.component';
import { FileUploadModule } from 'ng2-file-upload';
import { InvoiceDetailModalComponent } from './invoice-detail-modal/invoice-detail-modal.component';

@NgModule({
    imports: [CommonModule, BlankPageRoutingModule ,   FormsModule,
        ReactiveFormsModule ,FileUploadModule ,  NgbModule, NgxPaginationModule ,Ng2SearchPipeModule ,SharedModule,],



    declarations: [BlankPageComponent, InvoiceDetailModalComponent],
    entryComponents: [InvoiceDetailModalComponent]
})
export class BlankPageModule {}
