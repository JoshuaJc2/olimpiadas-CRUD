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
      primer_apellido: ["", [Validators.required]],
      segundo_apellido: [""],
      pais_origen: ["", [Validators.required]],
      nacimiento: ["", [Validators.required]]
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
    
    this.onSubmitCreate();
    /*
    let id = this.entrenadores.length + 1;
    let nuevaCat = new Entrenador(id, this.form.controls['nombre'].value!, this.form.controls['primer_apellido'].value!, 
      this.form.controls['segundo_apellido'].value!, this.form.controls['pais_origen'].value!, this.form.controls['nacimiento'].value!);
    this.entrenadores.push(nuevaCat);
    this.hideModalForm();
    //alert("La categoria ha sido registrada");
    this.swal.successMessage("El entrenador ha sido registrado"); // show message*/

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

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.idEntrenador = 0;
  }
}
