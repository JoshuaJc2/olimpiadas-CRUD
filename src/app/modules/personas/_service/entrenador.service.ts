import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_olimpiadas } from '../../../shared/api-olimpiadas';
import { Entrenador } from '../_model/entrenador';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private source = '/entrenador';

  constructor(
    private http : HttpClient
  ) { }
  
  createEntrenador(entrenador : Entrenador) : Observable<any>{
    return this.http.post(api_olimpiadas + this.source, entrenador);
  }

  getEntrenador(id : number) :Observable<any> {
    return this.http.get(api_olimpiadas + this.source + "/" + id);
  }

  getEntrenadores() : Observable<any>{
    return this.http.get(api_olimpiadas + this.source);
  }

  updateEntrenador(id : number, entrenador : any) : Observable<any> {
    return this.http.put(api_olimpiadas + this.source + "/" + id, entrenador);
  }

  deleteEntrenador(id : number) : Observable<any> {
    return this.http.delete(api_olimpiadas + this.source + "/" + id);
  }
}
