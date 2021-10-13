import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  // Define API
  baseURI: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  getSingleMetadata(nftID: any): Observable<any> | undefined {
    if (this.baseURI.getValue() !== '') {
      return this.http.get<any>(this.baseURI + '/' + nftID)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    return undefined;
  } 

  // Error handling 
  handleError(error: any): any {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       return '';
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}