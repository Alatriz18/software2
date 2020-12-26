import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  empleadoForm: FormGroup;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public fb: FormBuilder) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }


  config: any;
  collection = {count: 10, data: []}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      id: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      telefono: ['',Validators.required],
      afiess: ['',Validators.required],
      correo: ['',Validators.required],
      sueldo: ['',Validators.required]

    })

    for(var i=1; i <= this.collection.count; i++){
      this.collection.data.push({
        id: i,
        ci: "numerodecedula"+i,
        nombre: "nombre"+i,
        apellido: "apellido"+i,
        telefono: "telefono"+i,
        afiess: "afiess"+i,
        correo: "correo"+i,
        sueldo: "sueldo"+i
      });
    }

    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event){
    this.config.currentPage=event;
  }

  eliminar(item: any): void{
    this.collection.data.pop(item);
  }

  open(content) {
    this.modalService.open(content);
  }
  
  
}
