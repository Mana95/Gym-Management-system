import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SharedPipesModule {
    constructor(private sanitizer:DomSanitizer){}
    transform(html) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(html);
      }
 }
