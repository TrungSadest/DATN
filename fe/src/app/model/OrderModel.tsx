export class OrderModel{
    orderId: string;
    userId: number;
    totalPrice: number;
    status: string;
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
    constructor(orderId : string, userId : number, totalPrice : number, status : string, createdDate : string, createdBy : string, updatedDate : string, updatedBy : string) {
    this.orderId = orderId;
this.userId = userId;
this.totalPrice = totalPrice;
this.status = status;
this.createdDate = createdDate;
this.createdBy = createdBy;
this.updatedDate = updatedDate;
this.updatedBy = updatedBy;
    }; 

    static fromJSON(orderModelObject : any) : OrderModel | null{ 
      let orderModel : OrderModel | null = null;
      if(orderModelObject){ 
        orderModel = new OrderModel("",0,0,"","","","","");
        orderModel.orderId = orderModelObject.orderId ?  orderModelObject.orderId : "" ; 
orderModel.userId = orderModelObject.userId ?  orderModelObject.userId : 0 ; 
orderModel.totalPrice = orderModelObject.totalPrice ?  orderModelObject.totalPrice : 0 ; 
orderModel.status = orderModelObject.status ?  orderModelObject.status : "" ; 
orderModel.createdDate = orderModelObject.createdDate ?  orderModelObject.createdDate : "" ; 
orderModel.createdBy = orderModelObject.createdBy ?  orderModelObject.createdBy : "" ; 
orderModel.updatedDate = orderModelObject.updatedDate ?  orderModelObject.updatedDate : "" ; 
orderModel.updatedBy = orderModelObject.updatedBy ?  orderModelObject.updatedBy : "" ; 
      }
      return orderModel ;
    } 
}