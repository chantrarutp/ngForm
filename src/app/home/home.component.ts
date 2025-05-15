import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  searchControl = new FormControl();
  selectedDate: any;
  meals: any[] = [];
  isLoading: boolean = false;


  constructor(private router: Router, private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(keyword => {
        keyword = keyword.trim();
        if (!keyword) {
          return this.dataService.getRandomMeals();
        }
        return this.dataService.searchMeals(keyword);
      }),
      map(res => res?.meals || []),
      catchError(err => {
        this.openSnackBar('An error occurred!', 'Retry');
        console.error('API error', err);
        return of([]);
      }),
      tap(() => this.isLoading = false)
    ).subscribe(meals => {
      this.meals = meals;
    }); this.searchControl.setValue('');

  }


  getIngredients(meal: any): { ingredient: string, measure: string }[] {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure });
      }
    }

    return ingredients;
  }

  openIngredientDialog(meal: any): void {
    const ingredients = this.getIngredients(meal);
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: { strMeal: meal.strMeal, ingredients }
    });
  }

  openSnackBar(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}