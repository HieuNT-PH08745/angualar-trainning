import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from '../product.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductAddComponent} from '../product-add/product-add.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
  }

  searchForm: FormGroup = this.formBuilder.group({
    name: null,
    price: null,
    category: null,
  });
  searchObject: object = {
    name: null,
    price: null,
    category: null,
  };

  ngOnInit(): void {
    this.getProducts();
  }

  private createOptionSearch(searchForm) {
    const option = {};
    option['name'] = searchForm.name;
    option['price'] = searchForm.price;
    option['category'] = searchForm.category;
    return option;
  }

  search() {
    this.searchObject = this.searchForm.getRawValue();
    if (this.searchObject['name']) {
      this.searchObject['name'] = this.searchObject['name'].trim();
    }
    if (this.searchObject['price']) {
      this.searchObject['price'] = this.searchObject['price'].trim();
    }
    if (this.searchObject['category']) {
      this.searchObject['category'] = this.searchObject['category'].trim();
    }
    console.log(this.searchObject);
    this.productService.searchProduct(this.createOptionSearch(this.searchObject)).subscribe(res => {
      this.products = res;
      console.log(res);
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  showSnackBar(message, action, durations, panelClasses) {
    const config = new MatSnackBarConfig();
    config.duration = durations;
    config.verticalPosition = 'top';
    if (panelClasses === true) {
      config.panelClass = ['snack-bar-error'];
    } else {
      config.panelClass = ['snack-bar-success'];
    }
    const snackBarRef = this.snackBar.open(message, action, config);
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getProducts();
        this.showSnackBar('Add successfully!', '', 3000, false);
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getProducts();
        this.showSnackBar('Update successfully!', '', 3000, false);
      }
    });
  }

  removeProduct(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productService.removeProduct(id).subscribe(response => {
          this.getProducts();
          this.showSnackBar('Delete successfully!', '', 3000, false);
        }, error => {
          this.showSnackBar('Delete error!', '', 3000, true);
        });
      }
    });
  }

}
