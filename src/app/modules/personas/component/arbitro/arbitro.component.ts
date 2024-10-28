import { Component } from '@angular/core';
import { Arbitro } from '../../_model/arbitro';
import { ArbitroService } from '../../_service/arbitro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shares-module';
import { SwalMessages } from '../../../../shared/swal-messages';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';

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
    private arbitroService : ArbitroService,
    private router : Router){
      this.form = this.formBuilder.group({
        nombre: ["",[Validators.required]],
        primerApellido: ["", [Validators.required]],
        segundoApellido: [null],
        paisOrigen: ["", [Validators.required]],
        nacimiento: ["", [Validators.required]]
      });
  }

  deleteArbitro(id : number) {
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la eliminacion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.arbitroService.deleteArbitro(id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage("El arbitro ha sido eliminado.");
            this.getArbitros();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
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

    if(this.idArbitro == 0){
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.arbitroService.createArbitro(this.form.value).subscribe({
      next : (v) => {
        this.getArbitros();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage("El arbitro ha sido creado");
      },
      error : (e) =>{
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.arbitroService.updateArbitro(this.idArbitro, this.form.value).subscribe({
      next : (v) => {
        this.getArbitros();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage("El arbitro se ha actualizado");
      },
      error : (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  updateArbitro(arbitro : Arbitro){
    this.resetVariables();
    this.showModalForm();
    this.idArbitro = arbitro.id;
    this.form.controls['nombre'].setValue(arbitro.nombre);
    this.form.controls['primerApellido'].setValue(arbitro.primerApellido);
    this.form.controls['segundoApellido'].setValue(arbitro.segundoApellido);
    this.form.controls['paisOrigen'].setValue(arbitro.paisOrigen);
    this.form.controls['nacimiento'].setValue(arbitro.nacimiento);
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.idArbitro = 0;
  }

  verDetalles(id : number){
    this.router.navigate(['detalles-arbitro', id]);
  }
}
