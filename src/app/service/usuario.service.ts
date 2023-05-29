import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { 

  }
 returnLastCreated(): Observable<any>{
  return this.httpClient.get<any>('http://localhost:9000/api/v1/usuario'+'/returnLastCreated').pipe(map(res=>res));
}
returnUserById(id: number): Observable<any>{
  return this.httpClient.get<any>('http://localhost:9000/api/v1/usuario'+'/returnUserById/'+id).pipe(map(res=>res));
}

  saveUsuarios(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/v1/usuario'+'/save',request).pipe(map(res=>res));
  }
  
}
