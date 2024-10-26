import { Injectable } from '@angular/core';
import { Arbitro } from '../_model/arbitro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_olimpiadas } from '../../../shared/api-olimpiadas';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {
  private source = '/olimpiadas';

  constructor(
    private http : HttpClient
  ) { }

  getArbitros() : Observable<any>{
    return this.http.get(api_olimpiadas + this.source + "/arbitro");
  }
}
