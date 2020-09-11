import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { UsersService } from '../shared/users.service';
import {NgForm} from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from "firebase";
import {ToastrService } from 'ngx-toastr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Event } from '../shared/event.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
list:Event[]
rowGroupMetadata: any;
cols:any;
imageName: string
image : File

  
  constructor(private dialog:MatDialog, public service:UsersService, private firestore:AngularFirestore, private toastr:ToastrService ) { 
    this.cols =[
      { field: 'event', header: 'Event' },
      { field: 'venue', header: 'Venue' },
      { field: 'details', header: 'Details' },
      { field: 'date', header: 'Date' },
      { field: 'action', header: 'Action' } ,]
  }

  ngOnInit(): void {
    this.resertForm()
    this.service.getEvents().subscribe(actionArray=>{
      this.list = actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data() as {} } as Event
        })
      
    })
  }

  openDialog(){
    this.dialog.open(CustomDialogComponent)
  }
  addImage(event:any){
     var file = event.target.files[0]
     this.imageName=file.name
     this.image = file
     
  }

  resertForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.eventForm ={
      id :null,
      event: '',
      venue: '',
      details: '',
      date: '',
      image:''
    }
  }

  onSubmit(form:NgForm){
    
    let data = Object.assign({},form.value);
    let newdate = data.date
    delete data.id;
    data.date=""+newdate
    if(form.value.id==null){
      if(this.image!=null){
        data.image=this.imageName
        const storageRef: firebase.storage.Reference=firebase.storage().ref('/events/'+this.imageName);
        const metadata = {'contentType':this.image.type}
        storageRef.put(this.image,metadata);
        }else(
          data.image=null
        )
      
      this.firestore.collection('events').add(data);
      this.toastr.success('Saved', 'Farchis App');
      this.imageName=null;
      this.image=null;
    }
    else{
      this.firestore.doc('events/' + form.value.id).update(data);
      this.toastr.success('Update', 'Farchis App');
    }
    this.resertForm(form);
  }

  onDelete(id:String){
    if(confirm('Are you sure you want to delete this record !')){
    this.firestore.doc('events/'+id).delete()
    this.toastr.warning('Service Deleted', 'Farchis')
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.list) {
        for (let i = 0; i < this.list.length; i++) {
            let rowData = this.list[i];
            let event = rowData.event;
            if (i == 0) {
                this.rowGroupMetadata[event] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.list[i - 1];
                let previousRowGroup = previousRowData.event;
                if (event === previousRowGroup)
                    this.rowGroupMetadata[event].size++;
                else
                    this.rowGroupMetadata[event] = { index: i, size: 1 };
            }
        }
    }
}
}
