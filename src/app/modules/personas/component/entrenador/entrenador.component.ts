import { Component } from '@angular/core';
import { Entrenador } from '../../_model/entrenador';
import { SharedModule } from '../../../../shared/shares-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalMessages } from '../../../../shared/swal-messages';
import { EntrenadorService } from '../../_service/entrenador.service';
import {NgxPaginationModule} from 'ngx-pagination';

declare var $:any;

@Component({
  selector: 'app-entrenador',
  standalone: true,
  imports: [SharedModule,NgxPaginationModule],
  templateUrl: './entrenador.component.html',
  styleUrl: './entrenador.component.css'
})
export class EntrenadorComponent {
  entrenadores : Entrenador[] = [];
  form : FormGroup;
  swal : SwalMessages = new SwalMessages();
  submitted = false;
  loading = false;
  idEntrenador : number = 0;
  p : number = 1;
  itemsPerPage: number = 10;
  totalEntrenadores : any;

  constructor(
    private formBuilder : FormBuilder,
    private entrenadorService : EntrenadorService
  ){
    this.form = this.formBuilder.group({
      nombre: ["",[Validators.required]],
      primerApellido: ["", [Validators.required]],
      segundoApellido: ["", [Validators.required]],
      paisOrigen: ["", [Validators.required]],
      nacimiento: ["", [Validators.required]]
    });
  }

  deleteEntrenador(id : number) {
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la eliminacion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrenadorService.deleteEntrenador(id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage("El entrenador ha sido eliminado");
            this.getEntrenadores();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  getEntrenadores(){
    this.loading = true;
    this.entrenadorService.getEntrenadores().subscribe({
      next: (v) => {
        console.log(v);
        this.entrenadores= v;
        this.totalEntrenadores = v.length;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  ngOnInit(){
    this.getEntrenadores();
  }

  // Modals
  showModalForm(){
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal('show');
  }

  hideModalForm(){
    $("#modalForm").modal('hide');
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    if(this.idEntrenador == 0){
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.entrenadorService.createEntrenador(this.form.value).subscribe({
      next : (v) => {
        this.getEntrenadores();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage("El entrenador ha sido creado");
      },
      error : (e) =>{
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.entrenadorService.updateEntrenador(this.idEntrenador, this.form.value).subscribe({
      next : (v) => {
        this.getEntrenadores();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage("El entrenador se ha actualizado");
      },
      error : (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  updateEntrenador(entrenador : Entrenador){
    this.resetVariables();
    this.showModalForm();
    this.idEntrenador = entrenador.id;
    this.form.controls['nombre'].setValue(entrenador.nombre);
    this.form.controls['primerApellido'].setValue(entrenador.primerApellido);
    this.form.controls['SegundoApellido'].setValue(entrenador.segundoApellido);
    this.form.controls['paisOrigen'].setValue(entrenador.paisOrigen);
    this.form.controls['nacimiento'].setValue(entrenador.nacimiento);
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.idEntrenador = 0;
  }
}
