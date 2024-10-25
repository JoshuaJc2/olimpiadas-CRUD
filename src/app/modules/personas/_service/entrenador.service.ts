import { Injectable } from '@angular/core';
import { Entrenador } from '../_model/entrenador';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  constructor() { }

  getEntrenadores() : Entrenador[] {
    let entrenadores : Entrenador[] = [];
    // dummy 
    entrenadores.push(new Entrenador(4,"Miguel", "Miranda", "", "Italia", '2000-09-31'));
    entrenadores.push(new Entrenador(5,"Robert", "Lorenzo", "Crueldad", "Mexico", '1990-11-31'));
    entrenadores.push(new Entrenador(6,"Maquiavelo", "El", "Principe", "Italia", '1998-01-31'));
    entrenadores.push(new Entrenador(7,"Luigi", "Joseph", "Lantinos", "USA", '2000-02-31'));
    return entrenadores;
  }
}
