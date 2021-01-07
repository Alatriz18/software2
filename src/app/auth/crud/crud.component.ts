import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { isNullOrUndefined } from 'util';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  closeResult = '';
  

  empleadoForm: FormGroup;
  idFirabaseActualizar: string;
  actualizar: boolean;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public fb: FormBuilder, private firebaseServiceService: FirebaseServiceService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.dowloadPDF();

  }
 dowloadPDF(){
   const DATA = document.getElementById('listEmpleados');
   const doc = new jsPDF('p','pt','a4');
   const options = {
     background: 'white',
     scale: 3
   };
   html2canvas(DATA, options).then((canvas) => {
    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  });
    
    
  }
//public descargar(){
 // var doc=new jsPDF();
  //doc.html(document.getElementById('listEmpleados');
 // doc.save('Listar empleados.pdf');

//}//

  config: any;
  collection = { count: 0, data: [] }
  

  ngOnInit(): void {
    this.idFirabaseActualizar = "";
    this.actualizar = false;

    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.empleadoForm = this.fb.group({
      //id: ['', Validators.required],
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      afiess: ['', Validators.required],
      //descuentos: ['', Validators.required],
      hextra: ['', Validators.required],
      //hdia: ['', Validators.required],
      sueldo: ['', Validators.required],
      
    });
    
    this.firebaseServiceService.getEmpleado().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          //id: e.payload.doc.data().id,
          ci: e.payload.doc.data().ci,
          nombre: e.payload.doc.data().nombre,
          apellido: e.payload.doc.data().apellido,
          telefono: e.payload.doc.data().telefono,
          correo: e.payload.doc.data().correo,
          afiess: e.payload.doc.data().afiess,
          //descuentos: e.payload.doc.data().descuentos,
          hextra: e.payload.doc.data().hextra,
          //hdia: e.payload.doc.data().hdia,
          sueldo: e.payload.doc.data().sueldo,
          idFirebase: e.payload.doc.id,
          

        }
        
      })
      
    },
      error => {
        console.error(error);
      });
      

  }

  pageChanged(event){
    this.config.currentPage = event;
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
  actualizarEmpleado() {
    if (!isNullOrUndefined(this.idFirabaseActualizar)) {
      this.firebaseServiceService.updateEmpleado(this.idFirabaseActualizar, this.empleadoForm.value).then(resp => {
        this.empleadoForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }
  openEditar(content, item: any) {

    //llenar form para editar
    this.empleadoForm.setValue({
      //id: item.id,
      ci: item.ci,
      nombre: item.nombre,
      apellido: item.apellido,
      telefono: item.telefono,
      correo: item.correo,
      afiess: item.afiess,
      //descuentos: item.descuentos,
      hextra: item.hextra,
      //hdia: item.hdia,
      sueldo: item.sueldo,
    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  imprimirEmpleado(){
    const DATA = document.getElementById('oneempleado');
   const doc = new jsPDF('p','pt','a4');
   const options = {
     background: 'white',
     scale: 3
   };
   html2canvas(DATA, options).then((canvas) => {
    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  });

  }

 


  }


