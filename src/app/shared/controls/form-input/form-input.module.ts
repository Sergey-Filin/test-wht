import { NgModule } from "@angular/core";
import { FormInputComponent } from "./components/form-input/form-input.component";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";


@NgModule({
  declarations: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
  ],
  exports: [FormInputComponent]
})
export class FormInputModule {
}
