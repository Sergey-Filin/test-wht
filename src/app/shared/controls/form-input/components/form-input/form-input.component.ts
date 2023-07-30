import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import { ErrorState } from "@helpers/classes";

export type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements OnInit, ControlValueAccessor {

  public value: number | string;
  public icon: string;
  public matcher = new ErrorState();

  @Input() mode: string = 'input';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() type: InputType = 'text';
  @Input() rows: number | string = 1;
  @Input() defaultValue: number | string;

  @ViewChild('formInput', {static: true}) formInput: ElementRef;

  private onChangeFn = (value: any) => {
  }
  private onTouchedFn = () => {
  }

  ngOnInit(): void {
  }

  public onChangeValue(event: any): void {
    const value = event.target && event.target.value;
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: string): void {
    if (!value) {
      this.value = '';
    }
    this.value = value;
  }

  public onTouched(): void {
    this.onTouchedFn();
  }

  public onChange(value): void {
    this.onChangeFn(value);
  }

}
