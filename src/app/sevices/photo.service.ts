import { Photo } from './../models/photo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class PhotoService {
  private apiUrl: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  private apiKey: string = '&api_key=bYRK5kcwaVeijsqTQMzLz6Q2Ih9qctCgLrDm5sBn';
  constructor(private http: HttpClient) { }

  getPhotos(rover: string, sol: number, camera:string,page: number) : Observable<any> {
    const url = `${this.apiUrl}${rover}/photos?page=${page}&sol=${sol}&camera=${camera}${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.log('Error message: ' + error);
        return throwError(error);
      })
    );
  }

}
