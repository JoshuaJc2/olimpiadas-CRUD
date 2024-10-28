import { Component } from '@angular/core';
import { Arbitro } from '../../_model/arbitro';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbitroService } from '../../_service/arbitro.service';

@Component({
  selector: 'app-detalles-arbitro',
  standalone: true,
  imports: [],
  templateUrl: './detalles-arbitro.component.html',
  styleUrl: './detalles-arbitro.component.css'
})
export class DetallesArbitroComponent {
  id : number = 0;
  arbitro : Arbitro = new Arbitro();
  loading = false;

  constructor(
    private route : ActivatedRoute,
    private arbitroService : ArbitroService,
    private router : Router
  ){}
  
  getArbitro(){
    this.loading = true;
    this.arbitroService.getArbitro(this.id).subscribe({
      next: (v) => {
        this.arbitro = v;
        this.loading = false;
        console.log(this.arbitro);
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.getArbitro();
  }

  redirect(url : String){
    this.router.navigate([url]);
  }
}
