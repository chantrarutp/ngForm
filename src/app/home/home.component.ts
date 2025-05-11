import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  selectedDate: any;
  meals: any[] = [];
  keyword: string = '';

  constructor(private router: Router, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchMeals();
  }

  searchMeals(): void {
    this.dataService.searchMeals(this.keyword).subscribe(response => {
      console.log(response);
      if (response && response.meals) {
        this.meals = response.meals;
      } else {
        this.meals = [];
      }
    }, error => {
      console.error('Error fetching data: ', error);
      this.meals = [];
    });
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

  onRegis() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}