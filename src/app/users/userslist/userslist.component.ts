import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { CustomDialogComponent } from 'src/app/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  list : User[];
  cols:any
  rowGroupMetadata: any;

  constructor(public service: UsersService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    ) { 
      this.cols =[
        { field: 'fullname', header: 'Fullname' },
        { field: 'email', header: 'Email' },
        { field: 'mobile', header: 'Mobile#' },
        { field: 'action', header: 'Action' },
        
      ]
    }

  ngOnInit(): void {
    this.service.getUsers().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() as {} } as User
        })
      
    })
  }

  onEdit(user:User){
    this.service.formData = Object.assign({},user);
  }

  onDelete(id:string){
    if(confirm('Are you sure you want to delete this record !')){
      this.firestore.doc('users/'+id).delete();
      this.toastr.warning('Record Deleted', 'Farchis')
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.list) {
        for (let i = 0; i < this.list.length; i++) {
            let rowData = this.list[i];
            let user = rowData.email;
            if (i == 0) {
                this.rowGroupMetadata[user] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.list[i - 1];
                let previousRowGroup = previousRowData.email;
                if (user === previousRowGroup)
                    this.rowGroupMetadata[user].size++;
                else
                    this.rowGroupMetadata[user] = { index: i, size: 1 };
            }
        }
    }
}

}
