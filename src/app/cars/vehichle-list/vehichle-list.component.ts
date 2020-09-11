import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/car.model';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-vehichle-list',
  templateUrl: './vehichle-list.component.html',
  styleUrls: ['./vehichle-list.component.css']
})
export class VehichleListComponent implements OnInit {

  list:Car[]
  rowGroupMetadata: any;
  cols:any;
  
  

  constructor(public service:UsersService,private firestore:AngularFirestore, private toastr:ToastrService) { 
    this.cols =[
      { field: 'vehicle', header: 'Name' },
      { field: 'color', header: 'Color' },
      { field: 'regnumber', header: 'Reg#' },
      { field: 'year', header: 'Make Year' },
      { field: 'ownerName', header: 'Owner' },
      { field: 'ownerMobile', header: 'Mobile' },
      { field: 'action', header: 'Action' }
    ]
  }

  ngOnInit(): void {
    this.service.getCars().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() as {} } as Car
        })
      
    })

  }
  onEdit(car:Car){
    this.service.carFormData = Object.assign({},car);
  }
  
  onDelete(id:string){
    if(confirm('Are you sure you want to delete this record !')){
      this.firestore.doc('cars/'+id).delete();
      this.toastr.warning('Record Deleted', 'Farchis')
    }
  }
  onSort() {
    this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.list) {
        for (let i = 0; i < this.list.length; i++) {
            let rowData = this.list[i];
            let vehicle = rowData.vehicle;
            if (i == 0) {
                this.rowGroupMetadata[vehicle] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.list[i - 1];
                let previousRowGroup = previousRowData.vehicle;
                if (vehicle === previousRowGroup)
                    this.rowGroupMetadata[vehicle].size++;
                else
                    this.rowGroupMetadata[vehicle] = { index: i, size: 1 };
            }
        }
    }
}


}
