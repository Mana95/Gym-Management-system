import { ReactiveFormsModule } from '@angular/forms';
import { EditSuppliersRoutingModule } from './edit-suplliers-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSuplliersComponent } from './edit-suplliers.component';

@NgModule({
  declarations: [EditSuplliersComponent],
  imports: [
    CommonModule , EditSuppliersRoutingModule ,ReactiveFormsModule
  ]
})
export class EditSuplliersModule { }
