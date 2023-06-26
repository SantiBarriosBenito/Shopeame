import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserI } from 'src/app/interfaces/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private form: FormBuilder, private authApi: AuthService, private router:Router){}

  ngOnInit(): void {
    this.registerForm = this.form.group({
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]], 
      password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]]
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.valid){
      let user: UserI = this.registerForm.value;
      this.authApi.register(user).subscribe((data) =>{
        this.router.navigate(['/']);
      })
    }
  }
}
