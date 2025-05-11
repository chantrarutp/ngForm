import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedDate: any;
  meals: any[] = [];
  keyword: string = '';
  isLoading: boolean = false;


  constructor(private router: Router, private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchMeals();
  }

  searchMeals(): void {
    this.isLoading = true;

    this.dataService.searchMeals(this.keyword).subscribe(response => {
      console.log(response);
      if (response && response.meals) {
        this.meals = response.meals;
      } else {
        this.meals = [];
      }
      this.isLoading = false;
    }, error => {
      this.openSnackBar('An error occurred!', 'Retry');
      this.meals = [];
      this.isLoading = false;
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

  openSnackBar(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onRegis() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}