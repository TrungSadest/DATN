import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ProductModel } from "../../model/ProductModel";
import { ProductService } from "../../service/ProductService";

export default function Product() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
      ProductService.getInstance()
        .getListProduct()
        .then((res) => {
          setProducts(res.data.responseData);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);

  return (
    <>
      <Header></Header>
      <body>
        <div className="col-lg-8">
          <div className="row">
            {products.map((product) =>(
                <div className="col-md-4">
                <div className="product-item ms-4 mb-3">
                  <div className="product-title">
                    <a href="#">{product.productName}</a>                 
                  </div>
                  <div className="product-image">
                    <a href="product-detail.html">
                      <img src="/assets/img/messages-1.jpg" alt="" />
                    </a>
                    <div className="product-action">
                      <a href="#">
                        <i className="pi pi-cart-minus"></i>
                      </a>
                      <a href="#">
                        <i className="pi pi-search"></i>
                      </a>
                    </div>
                  </div>
                  <div className="product-price">
                    <h3>
                      {product.unitPrice}<span>VND</span>
                    </h3>
                    <a className="btn" href="">
                      <i className="pi pi-shopping-cart"></i>Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
            

          </div>         
        </div>
      </body>
    </>
  );
}
