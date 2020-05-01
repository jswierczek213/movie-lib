import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
