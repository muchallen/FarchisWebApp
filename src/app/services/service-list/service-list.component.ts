import { Component, OnInit } from '@angular/core';
import {Quotation} from '../../shared/quotation.model'
import { UsersService } from 'src/app/shared/users.service';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  list:Quotation[];
  constructor(private service:UsersService,private firestore:AngularFirestore,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() } as Quotation
        })
      
    })

  }

  onDelete(id:String){
    this.firestore.doc('services/'+id).delete()
    this.toastr.warning('Service Deleted', 'Farchis')

  }

}
