import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  list : User[];
  constructor(private service: UsersService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() } as User
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

}
