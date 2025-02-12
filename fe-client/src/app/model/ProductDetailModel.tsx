export class ColorModel {
  colorId?: string;
  colorName?: string;
  colorCode?: string;
  constructor(colerId?: string, corlorName?: string, colorCode?: string) {
    this.colorId = colerId;
    this.colorCode = colorCode;
    this.colorName = corlorName;
  };
}
export class SizeModel {
  sizeId?: string;
  sizeName?: string;
  constructor(sizesId?: string, sizesName?: string) {
    this.sizeId = sizesId;
    this.sizeName = sizesName;
  };
}
export class ProductDetailModel {
  productDetailId?: string;
  productId?: string;
  color?: ColorModel;
  size?: SizeModel;
  imageUrl?: string;
  quantity?: number;
  constructor(productDetailId?: string, productId?: string, color?: ColorModel, sizeModel?: SizeModel, imageUrl?: string, quantity?: number) {
    this.productDetailId = productDetailId;
    this.productId = productId;
    this.color = color;
    this.size = sizeModel;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}