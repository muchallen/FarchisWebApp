import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { ToastrService } from 'ngx-toastr';
import {Towing} from '../../shared/towing.model'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-towing-list',
  templateUrl: './towing-list.component.html',
  styleUrls: ['./towing-list.component.css']
})
export class TowingListComponent implements OnInit {

  constructor(private service:UsersService, private toastr:ToastrService,private firestore:AngularFirestore) { }
  towing:Towing[]
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





}
