import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ProductModel } from '../../model/ProductModel';
import { PublicService } from '../../services/PublicService';
import SideBarProduct from './SideBarProduct';
import { ColorModel, ProductDetailModel, SizeModel } from '../../model/ProductDetailModel';
import { generateImageUrl } from '../../utils/imageUtil';

export default function ProductDetail() {
    const location = useLocation();
    const { product } = location.state as { product: ProductModel };
    const [productDetail, setProductDetail] = useState<ProductDetailModel[]>([]);
    const [selectedColor, setSelectedColor] = useState<ColorModel | undefined>(undefined);
    const [selectedSize, setSelectedSize] = useState<SizeModel | undefined>(undefined);
    const [selectedProductDetail, setSelectedProductDetail] = useState<ProductDetailModel>();
    // const [prod, setProd] = useState<ProductModel>();



    useEffect(() => {
        console.log(product);
        if (product.productId) {
            PublicService.getInstance().getProductDetailByProductId(product.productId).then(res => {
                console.log(res.data.responseData);
                setProductDetail(res.data.responseData);
            }).catch(e => {
                console.log(e);
            })
        }
    }, [location, product])

    const uniqueColor = Array.from(
        new Set(productDetail.map((product) => product.color?.colorCode))
    ).map((colorCode) => {
        return productDetail.find((product) => product.color?.colorCode === colorCode)?.color;
    });

    const uniqueSize = Array.from(
        new Set(productDetail.map((product) => product.size?.sizeName))
    ).map((sizeName) => {
        return productDetail.find((product) => product.size?.sizeName === sizeName)?.size;
    });
    const availableSize = selectedColor
        ? productDetail.filter((product) => product.color?.colorName === selectedColor.colorName)
            .map((product) => product.size)
        : uniqueSize;

    const availableColor = selectedSize
        ? productDetail.filter((product) => product.size?.sizeName === selectedSize.sizeName)
            .map((product) => product.color)
        : uniqueColor;

    useEffect(() => {
        if (selectedColor && selectedSize) {
            const foundProductDetail = productDetail.find(
                (productDetail) =>
                    productDetail.color?.colorId === selectedColor.colorId &&
                    productDetail.size?.sizeId === selectedSize.sizeId
            );
            setSelectedProductDetail(foundProductDetail);
        }
    }, [selectedColor])

    console.log(selectedProductDetail);
    return (
        <>
            <div className='container-fluid'>
                <div className='product-detail row'>
                    <div className="col-lg-9">
                        <div className="product-detail-top">
                            <div className="row align-items-center">
                                <div className="col-md-5">
                                    <div className="product-slider-single normal-slider">
                                        {selectedProductDetail == null &&
                                            <img src={generateImageUrl(product.thumbnail ?? "")} style={{ width: "400px" }} />
                                        }
                                        {selectedProductDetail != null &&
                                            <img src={generateImageUrl(selectedProductDetail.imageUrl ?? "")}
                                                style={{ width: "400px" }}
                                            />
                                        }
                                    </div>

                                </div>
                                <div className="col-md-7">
                                    <div className="product-content">
                                        <div className="title"><h2>{product.productName}</h2></div>
                                        {/* <div className="ratting">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div> */}
                                        <div className="price">
                                            <h4>Đơn giá:</h4>
                                            {
                                                product.discount === true &&
                                                <p>
                                                    {product.discountPrice.toLocaleString()}đ
                                                    <span>{product.unitPrice.toLocaleString()}đ
                                                    </span>
                                                </p>
                                            }
                                            {
                                                product.discount === false &&
                                                <p>
                                                    {product.unitPrice.toLocaleString()}đ
                                                    {/* <span>{product.unitPrice.toLocaleString()}đ
                                                    </span> */}
                                                </p>
                                            }
                                        </div>
                                        <div className="quantity">
                                            <h4>Quantity:</h4>
                                            <div className="qty">
                                                <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                <input type="text" value={selectedProductDetail?.quantity} />
                                                <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                        <div className="p-size">
                                            <h4>Size:</h4>
                                            <div className="btn-group btn-group-sm">
                                                {availableSize.map((size) => (
                                                    <button
                                                        key={size?.sizeId}
                                                        onClick={() => {
                                                            setSelectedSize(size);
                                                            setSelectedColor(undefined);
                                                        }}
                                                        type="button" className="btn">{size?.sizeName}</button>

                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-color">
                                            <h4>Color:</h4>
                                            <div className="btn-group btn-group-sm">
                                                {availableColor.map((color) => (
                                                    <button
                                                        key={color?.colorId}
                                                        onClick={() => {
                                                            setSelectedColor(color);
                                                            // setSelectedSize(undefined);
                                                        }}
                                                        type="button" className="btn">{color?.colorName}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="action">
                                            <a className="btn" href="#"><i className="fa fa-shopping-cart"></i>Add to Cart</a>
                                            <a className="btn" href="#"><i className="fa fa-shopping-bag"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row product-detail-bottom">
                            <div className="col-lg-12">
                                <ul className="nav nav-pills nav-justified">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#reviews">Reviews (1)</a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div id="description" className="container tab-pane active">
                                        <h4>Product description</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque. Suspendisse sit amet neque neque. Praesent suscipit et magna eu iaculis. Donec arcu libero, commodo ac est a, malesuada finibus dolor. Aenean in ex eu velit semper fermentum. In leo dui, aliquet sit amet eleifend sit amet, varius in turpis. Maecenas fermentum ut ligula at consectetur. Nullam et tortor leo.
                                        </p>
                                    </div>
                                    <div id="specification" className="container tab-pane fade">
                                        <h4>Product specification</h4>
                                        <ul>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div id="reviews" className="container tab-pane fade">
                                        <div className="reviews-submitted">
                                            <div className="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                            </p>
                                        </div>
                                        <div className="reviews-submit">
                                            <h4>Give your Review:</h4>
                                            <div className="ratting">
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <div className="row form">
                                                <div className="col-sm-6">
                                                    <input type="text" placeholder="Name" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="email" placeholder="Email" />
                                                </div>
                                                <div className="col-sm-12">
                                                    <textarea placeholder="Review"></textarea>
                                                </div>
                                                <div className="col-sm-12">
                                                    <button>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="section-header">
                                <h1>Related Products</h1>
                            </div>

                            <div className="row align-items-center product-slider product-slider-3">
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src="/assets/img/product-10.jpg" alt="Product Image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src="/assets/img/product-8.jpg" alt="Product Image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src="/assets/img/product-6.jpg" alt="Product Image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src="/assets/img/product-4.jpg" alt="Product Image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src="/assets/img/product-2.jpg" alt="Product Image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SideBarProduct />
                </div>
            </div>

        </>
    )
}
