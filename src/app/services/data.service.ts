import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

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

  getRandomMeals(count: number = 9): Observable<any> {
    const requests = Array.from({ length: count }).map(() =>
      this.http.get<any>('https://www.themealdb.com/api/json/v1/1/random.php')
    );

    return forkJoin(requests).pipe(
      map(results => ({
        meals: results.flatMap(r => r.meals || [])
      }))
    );
  }
}
