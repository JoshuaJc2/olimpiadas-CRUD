import { Injectable } from '@angular/core';
import { Arbitro } from '../_model/arbitro';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  constructor() { }

  getArbitros() : Arbitro[] {
    let arbitros : Arbitro[] = [];
    // dummy 
    arbitros.push(new Arbitro(0,"Miguel", "Miranda", "", "Italia", '2000-09-16'));
    arbitros.push(new Arbitro(1,"Robert", "Lorenzo", "Crueldad", "Mexico", '1990-11-20'));
    arbitros.push(new Arbitro(2,"Maquiavelo", "", "", "Italia", '1998-01-23'));
    arbitros.push(new Arbitro(3,"Luigi", "Joseph", "Lantinos", "USA", '2000-02-04'));
    return arbitros;
  }
}
