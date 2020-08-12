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
  
  constructor(private service:UsersService,private firestore:AngularFirestore,private toastr:ToastrService, private dialog:MatDialog) { }

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

}
