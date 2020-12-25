import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor() { }
  config: any;
  collection = {count: 60, data: []}

  ngOnInit(): void {

    for(var i=0; i < this.collection.count; i++){
      this.collection.data.push({
        id: i,
        nombre: "nombre"+i,
        apellido: "apellido"+i
      })
    }

    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    }
  }

}
