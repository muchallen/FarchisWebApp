import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialog(){
    this.dialog.open(CustomDialogComponent)
  }

}
