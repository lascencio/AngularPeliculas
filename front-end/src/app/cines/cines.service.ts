import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {
  
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'cines';

  public crear(cine: cineCreacionDTO){
    return this.http.post(this.apiURL, cine);
  }

  public obtenerTodos(pagina: number, cantidadRegistrosaMostrar: number): Observable<any>{
    let params  = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosaMostrar.toString());
    return this.http.get<cineDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public borrar(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public obtenerPorId(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }

  public editar(id: number, cine: cineCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, cine);
  }

}
