import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor( private firestore: AngularFirestore) { }


  getEmpleado(){
    return this.firestore.collection("empleados").snapshotChanges();

  }
  createEmpleado(empleado:any){
    return this.firestore.collection("empleados").add(empleado);
  }
  
  updateEmpleado(id:any, empleado:any){
    return this.firestore.collection("empleados").doc(id).update(empleado);

  }
  deleteEmpleado(id:any){
    return this.firestore.collection("empleados").doc(id).delete();
  }
}
