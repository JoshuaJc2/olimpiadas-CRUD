import { Component } from '@angular/core';
import { Arbitro } from '../../_model/arbitro';
import { ArbitroService } from '../../_service/arbitro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shares-module';
import { SwalMessages } from '../../../../shared/swal-messages';
import {NgxPaginationModule} from 'ngx-pagination';

declare var $: any;

@Component({
  selector: 'app-arbitro',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule],
  templateUrl: './arbitro.component.html',
  styleUrl: './arbitro.component.css'
})

export class ArbitroComponent {
  arbitros : Arbitro[] = []; 
  form : FormGroup;
  swal : SwalMessages = new SwalMessages();
  idArbitro : number = 0;
  submitted = false;
  loading = false;
  p : number = 1;
  itemsPerPage = 10;
  totalArbitros : any;

  constructor (
    private formBuilder : FormBuilder,
    private arbitroService : ArbitroService){
      this.form = this.formBuilder.group({
        nombre: ["",[Validators.required]],
        primer_apellido: ["", Validators.required],
        segundo_apellido: [""],
        pais_origen: ["", [Validators.required]],
        nacimiento: ["", [Validators.required]]
      });
  }

  getArbitros(){
    this.loading = true;
    this.arbitroService.getArbitros().subscribe({
      next: (v) => {
        console.log(v);
        this.arbitros= v;
        this.totalArbitros = v.length;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });  }

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
      this.form.controls['segundo_apellido'].value!, this.form.controls['pais_origen'].value!, this.form.controls['nacimiento'].value!);
    this.arbitros.push(nuevaCat);
    this.hideModalForm();
    //alert("La categoria ha sido registrada");
    this.swal.successMessage("El arbitro ha sido registrado"); // show message
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.idArbitro = 0;
  }
}
