import { Component } from '@angular/core';
import { Entrenador } from '../../_model/entrenador';
import { SharedModule } from '../../../../shared/shares-module';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrenadorService } from '../../_service/entrenador.service';

@Component({
  selector: 'app-detalles-entrenador',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './detalles-entrenador.component.html',
  styleUrl: './detalles-entrenador.component.css'
})
export class DetallesEntrenadorComponent {
  id : number = 0;
  entrenador : Entrenador = new Entrenador();
  loading = false;

  constructor(
    private route : ActivatedRoute,
    private entrenadorSevice : EntrenadorService,
    private router : Router
  ){}

  getEntrenador(){
    this.loading = true;
    this.entrenadorSevice.getEntrenador(this.id).subscribe({
      next: (v) => {
        this.entrenador = v;
        this.loading = false;
        console.log(this.entrenador);
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.getEntrenador();
  }

  redirect(url : String){
    this.router.navigate([url]);
  }
}
