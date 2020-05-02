import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
