import { WebpageComponent } from './webpage.component';
import { WebpageRoutingModule } from './webpage-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WebpageComponent],
  imports: [
    CommonModule ,WebpageRoutingModule
  ]
})
export class WebpageModule { }
