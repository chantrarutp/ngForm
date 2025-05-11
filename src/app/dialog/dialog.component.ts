import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.css'],
  template: `
    <h2 mat-dialog-title>Ingredients for {{ data.strMeal }}</h2>
    <mat-dialog-content>
      <ul>
        <li *ngFor="let item of data.ingredients">
          {{ item.ingredient }} {{ item.measure }}
        </li>
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}