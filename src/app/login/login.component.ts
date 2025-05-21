import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | undefined;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }


  onRegis() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    const isLoggedIn = this.authService.login(this.username, this.password);
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง*';
    }
  }

}
