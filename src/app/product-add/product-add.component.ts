import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProductListComponent} from '../product-list/product-list.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product();
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private dialogRef: MatDialogRef<ProductListComponent>
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl(),
      price: new FormControl(),
      category: new FormControl(),
    });
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value).subscribe(data => {
      this.dialogRef.close('ok');
    }, error => {
      console.log(error);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
