package com.be.controller;

import com.be.entity.*;
import com.be.model.OrderModel;
import com.be.model.ProductModel;
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
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CommonService commonService;

    @Autowired
    private UserRepository userRepository;

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
        Users users = userRepository.getById(orderModel.getUserId());
        orders.setUser(users);
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
    @GetMapping("/get-order-by/{orderId}")
    public ResponseEntity<ResponseData> getAllOrderById(@PathVariable String orderId){
        ResponseData responseData = new ResponseData();
        try {
            List<OrderItems> orderItems = orderItemRepository.findOrderItemsByOrderId(orderId);
            responseData.setStatus(true);
            responseData.setResponseData(orderItems);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData);
    }
    @PutMapping("/{orderId}/status")
    public ResponseEntity<ResponseData> updateStatus (@PathVariable String orderId, @RequestBody Map<String, String> requestBody){
        ResponseData responseData = new ResponseData();
        Orders orders = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + orderId));
        String status = requestBody.get("status");
        System.out.println("Received status: " + status);
        orders.setStatus(status);
        orderRepository.save(orders);

        responseData.setStatus(true);
        responseData.setResponseData(orders);
        return ResponseEntity.ok(responseData)  ;
    }
}
