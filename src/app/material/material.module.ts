import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,
  MatCheckboxModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,
  MatCheckboxModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
