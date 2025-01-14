import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../model/ProductModel';
import { PublicService } from '../../services/PublicService';
import { generateImageUrl } from '../../utils/imageUtil';
import { CategoryModel } from '../../model/CategoryModel';
import { BrandModel } from '../../model/BrandModel';
import { useNavigate } from 'react-router-dom';
import SideBarProduct from './SideBarProduct';

export default function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
        PublicService.getInstance().getListProduct()
            .then((res) => {
                console.log(res.data.responseData);
                setProducts(res.data.responseData);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const viewDetail = (product: ProductModel) => {
        navigate("detail", { state: { product } });
    }

    useEffect(() => {

    }, []);
    return (
        <>
            {/* <!-- Product List Start --> */}
            <div className="product-view">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="product-view-top">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="product-search">
                                                    <input className='form-control' type="email" placeholder='Tìm kiếm' />
                                                    <button><i className="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="product-short">
                                                    <select className="form-control border-dark text-dark" aria-label="Default select example">
                                                        <option selected>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="product-price-range">
                                                    <select className="form-control border-dark text-dark" aria-label="Default select example">
                                                        <option selected>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {products.map((product) => (
                                    <div key={product.productId} onClick={() => { viewDetail(product) }} className="pointer col-lg-3 col-md-4 col-sm-6">
                                        <div className="product-item">
                                            <div className="product-title">
                                                <a>{product.productName}</a>
                                                <div className="ratting">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <div className="product-image">
                                                <a  >
                                                    <img src={generateImageUrl(product.thumbnail ?? "")} />
                                                </a>
                                                {/* <div className="product-action">
                                                    <a><i className="fa fa-cart-plus"></i></a>
                                                    <a><i className="fa fa-heart"></i></a>
                                                    <a><i className="fa fa-search"></i></a>
                                                </div> */}
                                            </div>
                                            <div className="product-price">
                                                <div className='sub-price text-center'>
                                                    <h3>{(product.unitPrice * 100).toLocaleString()}<span>đ</span></h3>
                                                    <div>
                                                        <del className='text-muted'>100.000đ</del>
                                                    </div>
                                                </div>

                                                {/* <div>
                                                    <a className="btn" ><i className="fa fa-cart-plus"></i></a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}



                            </div>

                            {/* <!-- Pagination Start --> */}
                            <div className="col-md-12">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link" >Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link">1</a></li>
                                        <li className="page-item"><a className="page-link">2</a></li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!-- Pagination Start --> */}
                        </div>

                        {/* <!-- Side Bar Start --> */}
                        <SideBarProduct />
                        {/* <!-- Side Bar End --> */}
                    </div>
                </div>
            </div>
            {/* <!-- Product List End -->   */}
        </>
    )
}
