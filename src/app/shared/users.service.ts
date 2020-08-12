import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Car } from './car.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  formData : User
  carFormData : Car

  constructor(private firestore:AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  getCars(){
    return this.firestore.collection('cars').snapshotChanges();
  }

  getServices(){
    return this.firestore.collection('servs').snapshotChanges();
  }
  getTowing(){
    return this.firestore.collection('tows').snapshotChanges();
  }

}
