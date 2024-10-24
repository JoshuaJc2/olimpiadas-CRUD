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
    arbitros.push(new Arbitro(0,"Miguel", "Miranda", "", "Italia", new Date(2000, 9, 31)));
    arbitros.push(new Arbitro(1,"Robert", "Lorenzo", "Crueldad", "Mexico", new Date(1990, 9, 31)));
    arbitros.push(new Arbitro(2,"Maquiavelo", "", "", "Italia", new Date(1998, 9, 31)));
    arbitros.push(new Arbitro(3,"Luigi", "Joseph", "Lantinos", "USA", new Date(2000, 9, 31)));
    return arbitros;
  }
}
