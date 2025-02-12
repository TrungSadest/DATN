export class OrderItemModel{
    orderItemId: number;
    orderId: string;
    productDetailId: string;
    quantity: number;
    unitPrice: number;
    discountPrice: number;
    totalPrice: number;
    constructor(orderItemId : number, orderId : string, productDetailId : string, quantity : number, unitPrice : number, discountPrice : number, totalPrice : number) {
    this.orderItemId = orderItemId;
this.orderId = orderId;
this.productDetailId = productDetailId;
this.quantity = quantity;
this.unitPrice = unitPrice;
this.discountPrice = discountPrice;
this.totalPrice = totalPrice;
    }; 

    static fromJSON(orderItemModelObject : any) : OrderItemModel | null{ 
      let orderItemModel : OrderItemModel | null = null;
      if(orderItemModelObject){ 
        orderItemModel = new OrderItemModel(0,"","",0,0,0,0);
        orderItemModel.orderItemId = orderItemModelObject.orderItemId ?  orderItemModelObject.orderItemId : 0 ; 
orderItemModel.orderId = orderItemModelObject.orderId ?  orderItemModelObject.orderId : "" ; 
orderItemModel.productDetailId = orderItemModelObject.productDetailId ?  orderItemModelObject.productDetailId : "" ; 
orderItemModel.quantity = orderItemModelObject.quantity ?  orderItemModelObject.quantity : 0 ; 
orderItemModel.unitPrice = orderItemModelObject.unitPrice ?  orderItemModelObject.unitPrice : 0 ; 
orderItemModel.discountPrice = orderItemModelObject.discountPrice ?  orderItemModelObject.discountPrice : 0 ; 
orderItemModel.totalPrice = orderItemModelObject.totalPrice ?  orderItemModelObject.totalPrice : 0 ; 
      }
      return orderItemModel ;
    } 
}