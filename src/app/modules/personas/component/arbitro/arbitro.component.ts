import { Component } from '@angular/core';
import { Arbitro } from '../../_model/arbitro';
import { ArbitroService } from '../../_service/arbitro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shares-module';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any;

@Component({
  selector: 'app-arbitro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './arbitro.component.html',
  styleUrl: './arbitro.component.css'
})

export class ArbitroComponent {
  arbitros : Arbitro[] = []; 
  form : FormGroup;
  swal : SwalMessages = new SwalMessages();
  submitted = false;

  constructor (
    private formBuilder : FormBuilder,
    private arbitroService : ArbitroService){
      this.form = this.formBuilder.group({
        nombre: ["",[Validators.required]],
        primer_apellido: ["", Validators.required],
        segundo_apellido: [""],
        pais_origen: ["", [Validators.required]],
        nacimiento: ["", [Validators.required]]
      })
  }

  getArbitros(){
    this.arbitros = this.arbitroService.getArbitros();
  }

  ngOnInit(){
    this.getArbitros();
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
    let id = this.arbitros.length + 1;
    let nuevaCat = new Arbitro(id, this.form.controls['nombre'].value!, this.form.controls['primer_apellido'].value!, 
      this.form.controls['segudo_apellido'].value!, this.form.controls['pais_origen'].value!, this.form.controls['nacimiento'].value!);
    this.arbitros.push(nuevaCat);
    this.hideModalForm();
    //alert("La categoria ha sido registrada");
    this.swal.successMessage("La categoria ha sido registrada"); // show message
  }
}
