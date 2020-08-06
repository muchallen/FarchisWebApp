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

  constructor(private service:UsersService,private firestore:AngularFirestore, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getCars().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() } as Car
        })
      
    })

  }
  onEdit(car:Car){
    this.service.carFormData = Object.assign({},car);
  }

  onDelete(id:string){
    if(confirm('Are you sure you want to delete this record !')){
      this.firestore.doc('users/'+id).delete();
      this.toastr.warning('Record Deleted', 'Farchis')
    }
  }

}
