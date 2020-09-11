import { Component, OnInit } from '@angular/core';
import {Quotation} from '../../shared/quotation.model'
import { UsersService } from 'src/app/shared/users.service';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/custom-dialog/custom-dialog.component';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  list:Quotation[];
  rowGroupMetadata: any;
  cols:any;
  
  constructor(private service:UsersService,private firestore:AngularFirestore,private toastr:ToastrService, private dialog:MatDialog) { 
    this.cols =[
      { field: 'vehicle', header: 'Vehicles' },
      { field: 'service', header: 'Services' },
      { field: 'details', header: 'Details' },
      { field: 'contact', header: 'Contact' },
      { field: 'mobile', header: 'Contact#' },
      { field: 'date', header: 'Date' } ,
      { field: 'image', header: 'Image' } ,
      { field: 'action', header: 'Action' } ,
      
        
    ]
  }

  ngOnInit(): void {
    this.service.getServices().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() as {} } as Quotation
        })
      
    })

  }
  onView(quot:Quotation){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data=quot;

    this.dialog.open(CustomDialogComponent,dialogConfig)

  }

  onDelete(id:String){
    if(confirm('Are you sure you want to delete this record !')){
    this.firestore.doc('servs/'+id).delete()
    this.toastr.warning('Service Deleted', 'Farchis')
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.list) {
        for (let i = 0; i < this.list.length; i++) {
            let rowData = this.list[i];
            let service = rowData.service;
            if (i == 0) {
                this.rowGroupMetadata[service] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.list[i - 1];
                let previousRowGroup = previousRowData.service;
                if (service === previousRowGroup)
                    this.rowGroupMetadata[service].size++;
                else
                    this.rowGroupMetadata[service] = { index: i, size: 1 };
            }
        }
    }
}
openDialog(img:string){

  this.dialog.open(CustomDialogComponent,{data:img})
}
}
