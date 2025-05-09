import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this._formBuilder.group({
      gender: ['', [Validators.required, Validators.pattern("/\S/")]],
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      nickName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]],
      citizenID: ['', [Validators.required, Validators.pattern("^[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}$")]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
