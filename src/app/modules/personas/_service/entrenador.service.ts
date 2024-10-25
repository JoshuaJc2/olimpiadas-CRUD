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
    entrenadores.push(new Entrenador(0,"Miguel", "Miranda", "", "Italia", new Date('2000-09-31')));
    entrenadores.push(new Entrenador(1,"Robert", "Lorenzo", "Crueldad", "Mexico", new Date('1990-11-31')));
    entrenadores.push(new Entrenador(2,"Maquiavelo", "", "", "Italia", new Date('1998-01-31')));
    entrenadores.push(new Entrenador(3,"Luigi", "Joseph", "Lantinos", "USA", new Date('2000-02-31')));
    return entrenadores;
  }
}
