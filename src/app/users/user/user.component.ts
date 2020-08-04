import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( public service:UsersService,
    private firestore: AngularFirestore, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.resertForm()
  }

  resertForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData ={
      id :null,
      idnumber: '',
      fullname: '',
      email: '',
      mobile: '',
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
      this.firestore.collection('users').add(data);
    else
      this.firestore.doc('users/' + form.value.id).update(data)
    this.toastr.success('Saved', 'Farchis App')
    this.resertForm(form);
  }

}
