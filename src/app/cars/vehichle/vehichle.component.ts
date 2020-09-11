import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/shared/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehichle',
  templateUrl: './vehichle.component.html',
  styleUrls: ['./vehichle.component.css']
})
export class VehichleComponent implements OnInit {

  constructor(private firestore:AngularFirestore, public service:UsersService,private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm()
    this.service.carFormData={
      id:'',
      vehicle:'',
      year:'',
      regnumber:'',
      color:'',
      ownerName:'',
      ownerMobile:''
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value)
    delete data.id;
    if(form.value.id==null)
    this.firestore.collection('cars').add(data);
    else
    this.firestore.doc('cars/' + form.value.id).update(data)
  this.toastr.success('Saved', 'Farchis App')
  this.resetForm(form); 
  }

}
