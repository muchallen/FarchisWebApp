import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Quotation } from '../shared/quotation.model';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

quotation:Quotation
  constructor(   private dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.quotation = data}
  ngOnInit(): void {
  }

}
