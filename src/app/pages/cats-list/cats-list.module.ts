import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsListRoutingModule } from './cats-list-routing.module';
import { CatsListComponent } from './components/cats-list/cats-list.component';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormInputModule } from "@shared/controls/form-input";
import { WhtTableModule } from "@shared/modules/wht-table";
import { CatsListService } from "./services/cats-list.service";
import { CatsApiService } from "@shared/services";
import { CatsStateModule } from "../../store/cats-state";

@NgModule({
  declarations: [
    CatsListComponent
  ],
  imports: [
    CommonModule,
    CatsListRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FormInputModule,
    MatPaginatorModule,
    WhtTableModule,
  ],
  providers: [
    CatsListService,
    CatsApiService,
  ]
})
export class CatsListModule { }
