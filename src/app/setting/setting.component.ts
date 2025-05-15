import { AfterViewInit, Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, take } from 'rxjs/operators'
@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent implements AfterViewInit {
  results: string[] = [];

  ngAfterViewInit() {
    const input = document.getElementById('myInput') as HTMLInputElement;

    fromEvent(input, 'keyup')
      .pipe(
        map(() => input.value.trim()),
        filter(value => value.length > 3),
        take(3)
      )
      .subscribe(value => {
        this.results.push(value);
      });
  }
}