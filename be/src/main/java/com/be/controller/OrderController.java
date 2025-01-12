package com.be.controller;

import com.be.entity.Orders;
import com.be.model.OrderModel;
import com.be.model.ResponseData;
import com.be.repository.OrderItemRepository;
import com.be.repository.OrderRepository;
import com.be.repository.UserRepository;
import com.be.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CommonService commonService;


    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<Orders> list = orderRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @PostMapping("/add")
    public ResponseEntity<ResponseData> add (@RequestBody OrderModel orderModel) throws  Exception{
        ResponseData responseData = new ResponseData();
        String userName = commonService.getUserId();
        Orders orders = new Orders();
        orders.setUserId(orderModel.getUserId());
        orders.setDiscountId(orderModel.getDiscountId());
        orders.setTotalPrice(orderModel.getTotalPrice());
        orders.setStatus("1");
        orders.setCreatedBy(userName);
        orders.setCreatedDate(new Date());
        orderRepository.save(orders);
        responseData.setStatus(true);
        responseData.setResponseData(orders);
        return ResponseEntity.ok(responseData);
    }
}
