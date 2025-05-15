import { AfterViewInit, Component } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { map, filter, take, repeat } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent implements AfterViewInit {
  results: string[] = [];
  currentValue: string = 'Waiting...';
  private subscription: Subscription | null = null;

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

  startStream() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const source$ = interval(1000).pipe(
      take(4),
      repeat(2)
    );

    this.currentValue = 'Starting...';

    this.subscription = source$.subscribe({
      next: (val) => {
        this.currentValue = `Value: ${val}`;
        console.log('Value:', val);
      },
      complete: () => {
        this.currentValue = 'Completed!';
        console.log('Stream completed');
      }
    });
  }
}
