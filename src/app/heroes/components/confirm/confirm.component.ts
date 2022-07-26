import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  delete() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close()
  }
}
