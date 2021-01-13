import {Component, Inject, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {ProductListComponent} from '../product-list/product-list.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductListComponent>
  ) {
  }

  ngOnInit(): void {
    // this.getProduct();
    this.productForm = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name],
      price: [this.data.price],
      category: [this.data.category]
    });
  }

  updateProduct() {
    this.productService.addProduct(this.productForm.value).subscribe(data => {
      this.dialogRef.close('complete');
    });
  }

  close() {
    this.dialogRef.close();
  }

}
