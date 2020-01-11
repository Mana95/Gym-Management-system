import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import '../../config/ngx-bootstrap.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    CommonModule,
    BsDatepickerModule
  ]
})
export class SharedModule {

  constructor(
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }
 }
