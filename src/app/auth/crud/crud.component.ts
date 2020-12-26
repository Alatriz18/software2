import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
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

}
