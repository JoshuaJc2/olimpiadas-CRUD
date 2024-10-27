import { Injectable } from '@angular/core';
import { Arbitro } from '../_model/arbitro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_olimpiadas } from '../../../shared/api-olimpiadas';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {
  private source = '/arbitro';

  constructor(
    private http : HttpClient
  ) { }

  createArbitro(arbitro : Arbitro) : Observable<any>{
    return this.http.post(api_olimpiadas + this.source, arbitro);
  }

  getArbitro(id : number) : Observable<any>{
    return this.http.get(api_olimpiadas + this.source + "/" + id);
  } 

  getArbitros() : Observable<any>{
    return this.http.get(api_olimpiadas + this.source);
  }

  updateArbitro(id : number, arbitro : any) : Observable<any> {
    return this.http.put(api_olimpiadas + this.source + "/" + id, arbitro);
  }

  deleteArbitro(id : number) : Observable<any> {
    return this.http.delete(api_olimpiadas + this.source + "/" + id);
  }
 }
