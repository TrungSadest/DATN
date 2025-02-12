import { ProductModel } from "../model/ProductModel";

// Lấy giỏ hàng từ localStorage
export const getCart = (): ProductModel[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào localStorage
export const saveCart = (cart: ProductModel[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
