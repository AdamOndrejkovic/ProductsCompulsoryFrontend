import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {AlertService} from "../_services/alert.service";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username(){return this.form?.get('username')}
  get password(){return this.form?.get('password')}

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form && this.form.invalid){
      return;
    }

    if (this.username && this.password){
      this.loading = true;
      this.accountService.login(this.username?.value, this.password?.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.alertService.error(error)
            this.loading = false;
          }
        )
    }
  }

}
