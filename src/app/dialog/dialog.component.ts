import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  template: `
    <h2 mat-dialog-title>แจ้งเตือน</h2>
    <mat-dialog-content>คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>close</button>
    </mat-dialog-actions>
  `,
})
export class DialogComponent {

}