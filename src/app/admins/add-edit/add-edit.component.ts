import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../_services/alert.service";
import {first} from "rxjs";
import {ProductService} from "../../_services/product.service";

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form: FormGroup | undefined;
  id: number | undefined;
  isAddMode: boolean | undefined;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });

    if (!this.isAddMode) {
      // @ts-ignore
      this.productService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.f["name"].setValue(x.name);
          this.f["description"].setValue(x.description);
          this.f["price"].setValue(x.price);
        });
    }
  }

  get f() { // @ts-ignore
    return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // @ts-ignore
    if (this.form.invalid){
      return;
    }
    this.loading = true;

  }

  private createProduct() {
    // @ts-ignore
    this.productService.create(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Product successfully added.', {keepAfterRouteChange: true})
          this.router.navigate(['.', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }

  private updateUser(){
    // @ts-ignore
    this.productService.update(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Product successfully updated.', {keepAfterRouteChange: true})
          this.router.navigate(['..', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }
}
