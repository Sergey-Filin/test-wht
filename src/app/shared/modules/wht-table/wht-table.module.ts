import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WhtTableComponent } from './components/wht-table/wht-table.component';
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [
    WhtTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    NgOptimizedImage,
  ],
  exports: [
    WhtTableComponent
  ]
})
export class WhtTableModule { }
