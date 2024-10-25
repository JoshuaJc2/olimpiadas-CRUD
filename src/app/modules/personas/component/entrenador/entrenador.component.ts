import { Component } from '@angular/core';
import { Entrenador } from '../../_model/entrenador';
import { SharedModule } from '../../../../shared/shares-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalMessages } from '../../../../shared/swal-messages';
import { EntrenadorService } from '../../_service/entrenador.service';

declare var $:any;

@Component({
  selector: 'app-entrenador',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './entrenador.component.html',
  styleUrl: './entrenador.component.css'
})
export class EntrenadorComponent {
  entrenadores : Entrenador[] = [];
  form : FormGroup;
  swal : SwalMessages = new SwalMessages();
  submitted = false;

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
    this.entrenadores = this.entrenadorService.getEntrenadores();
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
    let id = this.entrenadores.length + 1;
    let nuevaCat = new Entrenador(id, this.form.controls['nombre'].value!, this.form.controls['primer_apellido'].value!, 
      this.form.controls['segundo_apellido'].value!, this.form.controls['pais_origen'].value!, this.form.controls['nacimiento'].value!);
    this.entrenadores.push(nuevaCat);
    this.hideModalForm();
    //alert("La categoria ha sido registrada");
    this.swal.successMessage("El entrenador ha sido registrado"); // show message
  }
}
