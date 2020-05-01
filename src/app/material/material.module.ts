import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatDividerModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
