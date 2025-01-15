import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ProductModel } from '../../model/ProductModel';
import { PublicService } from '../../services/PublicService';
import SideBarProduct from './SideBarProduct';
import { ColorModel, ProductDetailModel, SizeModel } from '../../model/ProductDetailModel';
import { generateImageUrl } from '../../utils/imageUtil';
import { toast } from 'react-toastify';

export default function ProductDetail() {
    const location = useLocation();
    const { product } = location.state as { product: ProductModel };
    const [productDetail, setProductDetail] = useState<ProductDetailModel[]>([]);
    const [selectedColor, setSelectedColor] = useState<ColorModel | undefined>(undefined);
    const [selectedSize, setSelectedSize] = useState<SizeModel | undefined>(undefined);
    const [selectedProductDetail, setSelectedProductDetail] = useState<ProductDetailModel>();
    const [value, setValue] = useState<number>(1);
    // const [prod, setProd] = useState<ProductModel>();

    const saveToCart = (productDetail: ProductDetailModel) => {
        // Lấy giỏ hàng hiện tại từ localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(
            (item: ProductDetailModel) => item.productDetailId === productDetail.productDetailId
        );

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            cart[existingProductIndex].quantity += value;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới với số lượng 1
            cart.push({
                ...productDetail,
                quantity: value
                , product: product
            });
        }

        // Lưu lại giỏ hàng mới vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    const handleAddToCart = () => {
        if (selectedProductDetail) {
            saveToCart(selectedProductDetail);
            toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        } else {
            toast.error("Bạn chưa chọn sản phẩm");
        }
    };

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

    const handlePlus = () => {
        if (value < (selectedProductDetail?.quantity || 0))
            setValue((prev) => prev + 1);
        else toast.error("Không được nhập quá số lượng tồn");
    };

    const handleMinus = () => {
        if (value > 1) {
            setValue((prev) => prev - 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Chỉ chấp nhận số nguyên dương
        const numericValue = parseInt(inputValue, 10);

        if (inputValue === "") {
            // Nếu người dùng xóa toàn bộ, đặt giá trị tạm thời là 0
            setValue(0);
        } else if (!isNaN(numericValue) && numericValue > 0) {
            if (numericValue <= (selectedProductDetail?.quantity || 0)) {
                setValue(numericValue); // Giá trị hợp lệ, cập nhật giá trị
            } else {
                toast.error("Không được nhập quá số lượng tồn");
            }
        }
    };

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
                                            <h4>Số lượng:</h4>
                                            <div className="qty">
                                                <button onClick={handleMinus} className="btn-minus"><i className="fa fa-minus"></i></button>
                                                <input
                                                    onChange={handleInputChange}
                                                    onBlur={() => {
                                                        // Đảm bảo giá trị tối thiểu là 1 khi người dùng rời khỏi ô nhập
                                                        if (value < 1) setValue(1);
                                                    }}
                                                    type="text" value={value} />
                                                <button onClick={handlePlus} className="btn-plus"><i className="fa fa-plus"></i></button>
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
                                            <a className="btn" onClick={handleAddToCart}><i className="fa fa-shopping-cart"></i>Add to Cart</a>
                                            <a className="btn" href="#"><i className="fa fa-shopping-bag"></i>Buy Now</a>
                                        </div>
                                        <div className="mt-3">
                                            <h5>Số lượng tồn: {selectedProductDetail?.quantity}</h5>
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
                                            {product.description}
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
