import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhonePipe } from '../phone.pipe';
import { citizenID } from '../citizen-id.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private phonePipe: PhonePipe, private citizenID: citizenID) {
    this.registerForm = this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      nickName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      citizenID: ['', [Validators.required, Validators.pattern(/^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$/)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
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

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  formattedPhone(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 10);
    const formatted = this.phonePipe.transform(input);
    event.target.value = formatted;
    this.registerForm.get('phone')?.setValue(formatted);
  }

  formattedCitizenID(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 13);
    const formatted = this.citizenID.transform(input);
    event.target.value = formatted;
    this.registerForm.get('citizenID')?.setValue(formatted);
  }
}
