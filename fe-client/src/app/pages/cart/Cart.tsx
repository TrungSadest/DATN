import React, { useEffect } from 'react'
import { generateImageUrl } from '../../utils/imageUtil';
import { ProductDetailModel } from '../../model/ProductDetailModel';
import { toast } from 'react-toastify';

export default function Cart() {
    const carts = JSON.parse(localStorage.getItem("cart") || "[]");
    // useEffect(() => {
    //     console.log(carts);
    // }, [carts])
    const removeFromCart = (productDetailId: string) => {
        // Lấy giỏ hàng hiện tại từ localStorage
        const carts = JSON.parse(localStorage.getItem("cart") || "[]");

        // Lọc bỏ sản phẩm có id khớp với productId
        const updatedCart = carts.filter((item: ProductDetailModel) => item.productDetailId !== productDetailId);

        // Lưu lại giỏ hàng mới vào localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        console.log(`Đã xóa sản phẩm có id: ${productDetailId} khỏi giỏ hàng.`);
    };
    const handleRemoveProduct = (id: string) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (confirmDelete) {
            removeFromCart(id);
            toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
        }
    };

    const handleIncreaseQuantity = (productDetailId: string) => {
        const carts = JSON.parse(localStorage.getItem("cart") || "[]");
        // Tìm sản phẩm trong giỏ hàng
        const updatedCart = carts.map((item: any) => {
            if (item.productDetailId === productDetailId) {
                return { ...item, quantity: item.quantity + 1 }; // Tăng số lượng sản phẩm
            }
            return item;
        });

        // Lưu lại giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

    };

    const handleDecreaseQuantity = (productDetailId: string) => {
        const carts = JSON.parse(localStorage.getItem("cart") || "[]");
        console.log(productDetailId);
        // Tìm sản phẩm trong giỏ hàng
        const updatedCart = carts.map((item: any) => {
            if (item.productDetailId === productDetailId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }; // Giảm số lượng sản phẩm
            }
            return item;
        });

        // Lưu lại giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Cập nhật lại state hoặc trigger rerender nếu cần
    };

    console.log(carts);
    return (
        <>
            {/* <!-- Cart Start --> */}
            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cart-page-inner">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody className="align-middle">
                                            {carts.length > 0 ? (
                                                carts.map((cart: any) => (
                                                    <tr key={cart.productDetailId}>
                                                        <td>
                                                            <div className="img">
                                                                <img src={generateImageUrl(cart.imageUrl)} alt="Product" />
                                                                <p>{cart.product.productName}{" - "}
                                                                    {cart.color.colorName} {" - "}
                                                                    {cart.size.sizeName}</p>
                                                            </div>
                                                        </td>
                                                        {cart.product.discount === true &&
                                                            <td>
                                                                {cart.product.discountPrice.toLocaleString()}đ
                                                            </td>
                                                        }
                                                        {cart.product.discount === false &&
                                                            <td>
                                                                {cart.product.unitPrice.toLocaleString()}đ
                                                            </td>
                                                        }
                                                        <td>
                                                            <div className="qty">
                                                                <button className="btn-minus" onClick={() => handleDecreaseQuantity(cart.productDetailId)}>
                                                                    <i className="fa fa-minus"></i>
                                                                </button>
                                                                <input type="text" value={cart.quantity} readOnly />
                                                                <button className="btn-plus" onClick={() => handleIncreaseQuantity(cart.productDetailId)}>
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        {cart.product.discount === true &&
                                                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                                .format(cart.product.discountPrice * cart.quantity)}
                                                            </td>
                                                        }
                                                        {cart.product.discount === false &&
                                                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                                .format(cart.product.unitPrice * cart.quantity)}
                                                            </td>
                                                        }
                                                        <td>
                                                            <button onClick={() => handleRemoveProduct(cart.productDetailId)}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} style={{ textAlign: "center" }}>
                                                        Giỏ hàng trống
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart-page-inner">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="coupon">
                                            <input type="text" placeholder="Coupon Code" />
                                            <button>Apply Code</button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="cart-summary">
                                            <div className="cart-content">
                                                <h1>Cart Summary</h1>
                                                <p>Sub Total<span>$99</span></p>
                                                <p>Shipping Cost<span>$1</span></p>
                                                <h2>Grand Total<span>$100</span></h2>
                                            </div>
                                            <div className="cart-btn">
                                                <button>Update Cart</button>
                                                <button>Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Cart End --> */}
        </>
    )
}
