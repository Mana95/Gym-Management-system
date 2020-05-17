import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NumberDirective } from './../../_directives/numbers-only.directive';
import { SanitizeHtmlDirective } from './../../_directives/sanitize-html.directive';
import { TwoDigitDecimaNumberDirective } from './../../_directives/twodigitdecimalnumber.directive';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import '../../config/ngx-bootstrap.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TwoDigitDecimaNumberDirective ,SanitizeHtmlDirective ,NumberDirective],
  imports: [
    CommonModule,
    NgbModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    CommonModule,
    BsDatepickerModule,
    TwoDigitDecimaNumberDirective,
    NumberDirective,
    SanitizeHtmlDirective
  ]
})
export class SharedModule {

  constructor(
  
    private bsLocaleService: BsLocaleService
  ) {
    console.log('HIIIIIII SHARED')
    this.bsLocaleService.use('pt-br');
  }
 }
