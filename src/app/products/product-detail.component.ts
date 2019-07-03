import { Component, OnInit } from "@angular/core";
import { Iproduct } from "./product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: Iproduct;
  imageWidth: number = 50;
  imageMargin: number = 2;
  messageError: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.pageTitle += `: ${id}`;
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
      },
      error => (this.messageError = <any>error)
    );
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }
}
