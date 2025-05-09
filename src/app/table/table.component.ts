import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html'
})
export class TableBasicExample implements AfterViewInit {
  keyword: string = '';
  meals: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  hidePageSize: boolean = false;
  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  disabled: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'strMeal',
    'strMealThumb',
    'areaCategory',
    'strYoutube',
    'ingredients'
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.dataService.getMeals().subscribe(response => {
      console.log(response);
      if (response && response.meals) {
        this.meals = response.meals;
        this.length = this.meals.length;
        this.dataSource.data = this.meals;
        this.paginator.pageIndex = this.pageIndex;
      } else {
        this.meals = [];
        this.dataSource.data = [];
        this.length = 0;
      }
    }, error => {
      console.error('Error fetching data: ', error);
      this.meals = [];
      this.dataSource.data = [];
      this.length = 0;
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

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadMeals();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
