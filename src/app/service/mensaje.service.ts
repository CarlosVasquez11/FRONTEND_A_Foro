import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private httpClient : HttpClient) { }

  saveMensaje(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/v1/mensaje'+'/save',request).pipe(map(res=>res));
  }

  subirPuntos(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/v1/mensaje'+'/subirPuntos',request).pipe(map(res=>res));
  }
  disminuirPuntos(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/v1/mensaje'+'/disminuirPuntos',request).pipe(map(res=>res));
  }

  listMensajesByIdUser(id: number): Observable<any>{
    return this.httpClient.get<any>('http://localhost:9000/api/v1/mensaje'+'/list/'+id).pipe(map(res=>res));
  }
}
