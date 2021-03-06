import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../_services/alert.service";
import {first} from "rxjs";
import {ProductService} from "../../_services/product.service";

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup
  id!: number;
  isAddMode!: boolean;
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
      id: [this.id],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.productService.getById(this.id)
        .pipe(first())
        .subscribe(product => {
          this.form.patchValue(product)
        });
    }
  }

  get name(){return this.form.get('name')}
  get description(){return this.form.get('description')}
  get price(){return this.form.get('price')}

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid){
      return;
    }
    this.loading = true;

  }

  createProduct() {
    this.productService.create(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Product successfully added.', {keepAfterRouteChange: true})
          this.router.navigate(['/admin', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }

  updateProduct(){
    this.productService.update(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Product successfully updated.', {keepAfterRouteChange: true})
          this.router.navigate(['/admin', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }
}
