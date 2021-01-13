import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    protected ref: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.ref.close();
  }

  save() {
    this.ref.close('confirm');
  }

}
