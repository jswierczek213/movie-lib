import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
