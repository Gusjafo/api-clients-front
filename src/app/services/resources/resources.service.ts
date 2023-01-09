import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from 'src/app/models/client';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private apiCharacterUrl: string = 'https://localhost:7087/api/clients';
  private apiCharacterSearchUrl: string = 'https://localhost:7087/api/search/';

  private apiWeatherUrl: string =
    'http://api.weatherapi.com/v1/current.json?key=a6164018e3c44dc8ba511232230901&q=';

  constructor(private http: HttpClient) {}

  getClientsData(): Observable<any> {
    return this.http
      .get(this.apiCharacterUrl)
      .pipe(catchError(this.handleError));
  }

  searchClientsData(key: string): Observable<any> {
    return this.http
      .get(this.apiCharacterSearchUrl + key)
      .pipe(catchError(this.handleError));
  }

  deleteClient(id: number): Observable<any> {
    return this.http
      .delete(this.apiCharacterUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  createClient(client: Client): Observable<any> {
    return this.http
      .post(this.apiCharacterUrl, client)
      .pipe(catchError(this.handleError));
  }

  editClient(client: Client): Observable<any> {
    return this.http
      .put(this.apiCharacterUrl + '/' + client.id, client)
      .pipe(catchError(this.handleError));
  }

  getWeatherData(city: string): Observable<any> {
    return this.http
      .get(this.apiWeatherUrl + city)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
