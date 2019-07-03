import { Component, OnInit } from "@angular/core";
import { Iproduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Products List ";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImages: boolean = false;
  messageError: string;
  filteredProducts: Iproduct[];
  products: Iproduct[] = [];
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  constructor(private productService: ProductService) {
    //this.listFilter = "cart";
  }

  performFilter(filterBy: string): Iproduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Iproduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImages = !this.showImages;
  }
  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.messageError = <any>error)
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Products List : " + message;
  }
}
