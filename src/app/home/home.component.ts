import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  meals: any[] = [];
  isLoading = false;

  constructor(private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(keyword => {
        const trimmed = keyword?.trim();
        return trimmed
          ? this.dataService.searchMeals(trimmed)
          : this.dataService.getRandomMeals();
      }),
      map(res => res?.meals || []),
      catchError(err => {
        this.handleError(err);
        return of([]);
      }),
      tap(() => this.isLoading = false)
    ).subscribe(meals => this.meals = meals);

    this.searchControl.setValue('');
  }

  getIngredients(meal: any): { ingredient: string, measure: string }[] {
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map(i => ({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      }))
      .filter(item => item.ingredient?.trim());
  }

  openIngredientDialog(meal: any): void {
    const ingredients = this.getIngredients(meal);
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        strMeal: meal.strMeal,
        ingredients
      }
    });
  }

  openSnackBar(message: string, action = 'Close'): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  private handleError(err: any): void {
    console.error('API error', err);
    this.openSnackBar('An error occurred!', 'Close');
  }
}
