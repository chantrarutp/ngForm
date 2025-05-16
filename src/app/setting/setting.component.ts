import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject, concat, fromEvent, interval, merge, Subscription } from 'rxjs';
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
  message$ = new BehaviorSubject<string>('Waiting...');

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

  startConcat() {
    this.message$.next('Starting concat...');
    const obs1$ = interval(1000).pipe(take(3), map(i => `A${i}`));
    const obs2$ = interval(500).pipe(take(3), map(i => `B${i}`));

    concat(obs1$, obs2$).subscribe({
      next: val => this.message$.next(`Concat: ${val}`),
      complete: () => this.message$.next('Concat Completed!')
    });
  }

  startMerge() {
    this.message$.next('Starting merge...');
    const obs1$ = interval(1000).pipe(take(3), map(i => `A${i}`));
    const obs2$ = interval(500).pipe(take(3), map(i => `B${i}`));

    merge(obs1$, obs2$).subscribe({
      next: val => this.message$.next(`Merge: ${val}`),
      complete: () => this.message$.next('Merge Completed!')
    });
  }
}