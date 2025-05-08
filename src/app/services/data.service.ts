import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private api = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  constructor(private http: HttpClient) { }

  searchMeals(keyword: string): Observable<any> {
    return this.http.get<any>(`${this.api}${keyword}`);
  }

  getMeals(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }
}
