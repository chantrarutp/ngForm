import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "My App"

  ngOnInit(): void {
    // liff.init({ liffId: '2007376646-Opq0Lm3x' })
    //   .then(() => {
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     } else {
    //       console.log('User is logged in');
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('LIFF init error', err);
    //   });
  }
}