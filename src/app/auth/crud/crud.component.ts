import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal) {}
  
  config: any;
  collection = {count: 60, data: []}

  ngOnInit(): void {

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
  eliminar(item:any):void{
    this.collection.data.pop(item);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
