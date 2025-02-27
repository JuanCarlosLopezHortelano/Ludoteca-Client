import { Injectable } from '@angular/core';
import { Prestamo } from './model/Prestamo';
import { Observable } from 'rxjs';
//import { PRESTAMO_DATA } from './model/mock-prestamos';
import { Pageable } from '../core/model/page/Pageable';
import { PrestamoPage } from './model/PrestamoPage';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/prestamo'

  getPrestamos(pageable: Pageable, idGame?:number, idClient?: number, filterDate?: string): Observable<PrestamoPage>{
    console.log(pageable)
    return this.http.post<PrestamoPage>(this.composeFindUrl(idGame,idClient,filterDate), {pageable: pageable})
  }

  savePrestamo(prestamo:Prestamo): Observable<Prestamo>{
    delete prestamo.id
    console.log(prestamo)
    return this.http.put<Prestamo>(this.baseUrl, prestamo);
  }

  formatDate(date: Date): string{
    return date.toISOString().split('T')[0];
  }

  deletePrestamo(idPrestamo: number): Observable<void>{
    
    
    return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`);
  }

  private composeFindUrl(idGame: number,idClient: number,filterDate: string):string {
      const params = new URLSearchParams();
      if(idGame){
        params.set('id_game',idGame.toString())
      }
      if(idClient){
        params.set('id_client',idClient.toString())
      }
      if(filterDate){
        params.set('filterDate',filterDate)
      }

      const queryString = params.toString();
      return queryString ? `${this.baseUrl}?${queryString}`: this.baseUrl;
  }
}

