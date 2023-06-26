import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserI } from 'src/app/interfaces/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(private form: FormBuilder, private authApi: AuthService, private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]], 
      password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]]
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
      let user: UserI = this.loginForm.value;
      this.authApi.login(user).subscribe((data: any) =>{
        localStorage.setItem("token", data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/login']);
      })
    }
  }
}
