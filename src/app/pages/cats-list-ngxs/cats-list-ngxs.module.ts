import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsListNgxsRoutingModule } from './cats-list-ngxs-routing.module';
import { CatsListNgxsComponent } from './components/cats-list-ngxs/cats-list-ngxs.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { WhtTableModule } from "@shared/modules/wht-table";
import { CatsStateModule } from "../../store/cats-state";


@NgModule({
  declarations: [
    CatsListNgxsComponent
  ],
  imports: [
    CommonModule,
    CatsListNgxsRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    WhtTableModule,
    CatsStateModule
  ]
})
export class CatsListNgxsModule { }
