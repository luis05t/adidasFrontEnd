import { Component, model } from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';

import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { ApiService } from '../product.service';
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { Validators as MyValidators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzInputNumberComponent,
    NgFor
  ],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export class ShoesComponent implements OnInit { 
  shoes:any
getShoes() {
this.apiService.getShoes().subscribe((data)=> {
    this.shoes = data
    console.log(this.shoes)
  });
}
    validateForm: FormGroup<{
    model: FormControl<string>;
    color: FormControl<string>;
    price: FormControl<number>;
  }>;
  constructor(
    private fb: NonNullableFormBuilder,
  private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      model: ['', [required]],
      color: ['', [required]],
      price: [0, [required]]
    });
  }
  ngOnInit(){ this.getShoes()}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
        this.apiService.createShoes(this.validateForm.value).subscribe(() => {
          this.createNotification('success', `${this.validateForm.value.model} ${this.validateForm.value.color}` ,"Employee has been created successfully!")
      this.validateForm.reset();
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title:string,  message: string): void {
    this.notification.create(
      type,
      title,message
    );
  }

}




