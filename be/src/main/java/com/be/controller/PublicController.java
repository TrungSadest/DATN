package com.be.controller;

import com.be.entity.*;
import com.be.model.BrandModel;
import com.be.model.CategoryModel;
import com.be.model.OrderModel;
import com.be.model.ResponseData;
import com.be.repository.*;
import com.be.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoriRepository categoriRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommonService commonService;

    @GetMapping("/product/get-all")
    public ResponseEntity<ResponseData> getAllProduct(){
        ResponseData responseData = new ResponseData();
        try {
            List<Products> list = productRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/category/get-all")
    public ResponseEntity<ResponseData> getAllCategory(){
        ResponseData responseData = new ResponseData();
        try {
            List<Categories> list = categoriRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/brand/get-all")
    public ResponseEntity<ResponseData> getAllBrand(){
        ResponseData responseData = new ResponseData();
        try {
            List<Brands> list = brandRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product/get-by-category")
    public ResponseEntity<ResponseData> getProductsByCategory(@RequestBody CategoryModel categoryModel){
        ResponseData responseData = new ResponseData();
        try {
            Categories  categories =  new Categories();
            categories.setCategoryId(categoryModel.getCategoryId());
            categories.setCategoryName(categoryModel.getCategoryName());
            List<Products> products = productRepository.findProductsByCategories(categories);
            responseData.setResponseData(products);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product/get-by-brand")
    public ResponseEntity<ResponseData> getProductsByBrand(@RequestBody BrandModel brandModel){
        ResponseData responseData = new ResponseData();
        try {
            Brands brands = new Brands();
            brands.setBrandId(brandModel.getBrandId());
            brands.setBrandName(brandModel.getBrandName());
            List<Products> products = productRepository.findProductsByBrands(brands);
            responseData.setResponseData(products);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product/get-by-productName/{productName}")
    public ResponseEntity<ResponseData> getProductByProductName(@PathVariable String productName){
        ResponseData responseData = new ResponseData();
        try {
            List<Products> products = productRepository.findProductsByProductNameLike("%"+productName+"%");
            responseData.setResponseData(products);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product-detail/get-by/{id}")
    public ResponseEntity<ResponseData> getById(@PathVariable String id){
        ResponseData responseData = new ResponseData();
        try {
            List<ProductDetails> list = productDetailRepository.getAllByProductId(id);
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @PostMapping("/add-order")
    public ResponseEntity<ResponseData> add (@RequestBody OrderModel orderModel) throws  Exception{
        ResponseData responseData = new ResponseData();
//        String userName = commonService.getUserId();
        if (orderModel.getUserId()==null){
            responseData.setStatus(false);
            return ResponseEntity.ok(responseData);
        }
        Orders orders = new Orders();
        Users users = userRepository.findById(orderModel.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + orderModel.getUserId()));
        orders.setUser(users);
        orders.setTotalPrice(orderModel.getTotalPrice());
        orders.setStatus("2");
//        orders.setCreatedBy(userName);
        orders.setCreatedDate(new Date());
        String orderId = orderRepository.save(orders).getOrderId();
        List<OrderItems> orderItems = orderModel.getOrderItems();
        for (OrderItems itemData : orderItems) {
            OrderItems orderItem = new OrderItems();
            orderItem.setOrderId(orderId);
            orderItem.setProductDetailId(itemData.getProductDetailId());
            orderItem.setQuantity(itemData.getQuantity());
            orderItem.setUnitPrice(itemData.getUnitPrice());
            orderItem.setDiscountPrice(itemData.getDiscountPrice());

            if (itemData.getDiscountPrice() == 0) {
                orderItem.setTotalPrice(orderItem.getUnitPrice() * orderItem.getQuantity());
            } else {
                orderItem.setTotalPrice(orderItem.getDiscountPrice() * orderItem.getQuantity());
            }

//            orderItems.add(orderItem);
            orderItemRepository.save(orderItem); // Ensure each orderItem is saved
        }
//        orderItemRepository.saveAll(orderItems);
        responseData.setStatus(true);
        responseData.setResponseData(orders);
        return ResponseEntity.ok(responseData);
    }
}
