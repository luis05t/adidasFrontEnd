import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShoesInterfaces } from './interfaces/shoes.interfaces';

export class ProductService {
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  createShoes<T>(item: T): Observable<ShoesInterfaces> {
    return this.http.post<ShoesInterfaces>(this.apiUrl+'/shoes', item).pipe(
      catchError(this.handleError) 
    );
  }

 
  updateShoesComponent(id: string, item: ShoesInterfaces): Observable<ShoesInterfaces> {
    return this.http.patch<ShoesInterfaces>(`${this.apiUrl}/${id}`, item).pipe(
      catchError(this.handleError) 
    );
  }

 
  deleteShoesComponent(id: string): Observable<ShoesInterfaces> {
    return this.http.delete<ShoesInterfaces>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) 
    );
  }

  
  getShoes(): Observable<ShoesInterfaces[]> {
    return this.http.get<ShoesInterfaces[]>(`${this.apiUrl}/shoes`).pipe(
      catchError(this.handleError) 
    );
  }

  // Private function to handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(error); // Propagate the error
  }
}
