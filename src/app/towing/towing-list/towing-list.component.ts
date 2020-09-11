import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { ToastrService } from 'ngx-toastr';
import {Towing} from '../../shared/towing.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-towing-list',
  templateUrl: './towing-list.component.html',
  styleUrls: ['./towing-list.component.css']
})
export class TowingListComponent implements OnInit {
  towing:Towing[]
  cols:any
  rowGroupMetadata: any;

  constructor(private dialog:MatDialog,private service:UsersService, private toastr:ToastrService,private firestore:AngularFirestore) { 
    this.cols =[
      { field: 'vehicle', header: 'Vehicle' },
      { field: 'location', header: 'Location' },
      { field: 'narration', header: 'Details' },
      {field: 'contactPerson', header: 'Contact'} ,
      { field: 'contactNumber', header: 'Mobile#' },
      { field: 'image', header: 'Image' },
      { field: 'action', header: 'Action' },
      
    ]
  }
  
  ngOnInit(): void {
    this.service.getTowing().subscribe(
      actionArray=>{
        this.towing = actionArray.map(item=>{
          return {
            id:item.payload.doc.id,
            ...item.payload.doc.data() as {} } as Towing
          })
        
      }
    )
  }

  onDelete(id:string){
    if(confirm('Are you sure you want to delete this record !')){
      this.firestore.doc('tows/'+id).delete();
      this.toastr.warning('Record Deleted', 'Farchis')
    }

  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.towing) {
        for (let i = 0; i < this.towing.length; i++) {
            let rowData = this.towing[i];
            let vehicle = rowData.vehicle;
            if (i == 0) {
                this.rowGroupMetadata[vehicle] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.towing[i - 1];
                let previousRowGroup = previousRowData.vehicle;
                if (vehicle === previousRowGroup)
                    this.rowGroupMetadata[vehicle].size++;
                else
                    this.rowGroupMetadata[vehicle] = { index: i, size: 1 };
            }
        }
    }
}
openDialog(img:string){

  this.dialog.open(CustomDialogComponent,{data:img})
}

}
