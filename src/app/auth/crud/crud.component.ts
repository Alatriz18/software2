import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  closeResult = '';

  empleadoForm: FormGroup;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public fb: FormBuilder, private firebaseServiceService: FirebaseServiceService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }


  config: any;
  collection = { count: 0, data: [] }

  ngOnInit(): void {

    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.empleadoForm = this.fb.group({
      id: ['', Validators.required],
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      afiess: ['', Validators.required],
      correo: ['', Validators.required],
      sueldo: ['', Validators.required]

    });

    this.firebaseServiceService.getEmpleado().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          ci: e.payload.doc.data().ci,
          nombre: e.payload.doc.data().nombre,
          apellido: e.payload.doc.data().apellido,
          telefono: e.payload.doc.data().telefono,
          afiess: e.payload.doc.data().afiess,
          correo: e.payload.doc.data().correo,
          sueldo: e.payload.doc.data().sueldo,
          idFirebase: e.payload.doc.id,

        }
      })
    },
      error => {
        console.error(error);
      });

  }



  eliminar(item: any): void {
    this.firebaseServiceService.deleteEmpleado(item.idFirebase);
  }
  guardarEmpleado(): void {
    this.firebaseServiceService.createEmpleado(this.empleadoForm.value).then(resp => {
      this.empleadoForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    });

  }

  open(content) {
    this.modalService.open(content);
  }




}
