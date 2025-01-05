package com.be.controller;

import com.be.entity.CartItems;
import com.be.entity.Products;
import com.be.model.CartItemModel;
import com.be.model.ResponseData;
import com.be.repository.CartItemRepository;
import com.be.repository.UserRepository;
import com.be.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommonService commonService;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<CartItems> list = cartItemRepository.findAll();
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
    public ResponseEntity<ResponseData> add (@RequestBody CartItemModel cartItemModel) throws  Exception{
        String userName = commonService.getUserId();
        ResponseData responseData = new ResponseData();
        Integer userId = userRepository.findByUsername(userName).getUserId();
        String productDetailId = cartItemModel.getProductDetailId();
        CartItems cartItems1 = cartItemRepository.findCartItemsByProductDetailIdAndUserId(productDetailId,userId);
        CartItems cartItems = new CartItems();
        cartItems.setUserId(userId);
        cartItems.setProductDetailId(cartItemModel.getProductDetailId());
        cartItems.setQuantity(cartItemModel.getQuantity());
        cartItems.setCreatedDate(new Date());
        cartItems.setCreatedBy(cartItemModel.getCreatedBy());
        cartItems.setUpdatedDate(cartItemModel.getUpdatedDate());
        cartItems.setUpdatedBy(cartItemModel.getUpdatedBy());
        if(cartItems1 != null){
            cartItems.setQuantity(cartItems1.getQuantity()+cartItems.getQuantity());
            cartItems.setCartId(cartItems1.getCartId());
        }
        cartItemRepository.save(cartItems);
        responseData.setStatus(true);
        responseData.setResponseData(cartItems);
        return ResponseEntity.ok(responseData)  ;
    }
    @PutMapping("/update")
    public ResponseEntity<ResponseData> update (@RequestBody CartItemModel cartItemModel){
        ResponseData responseData = new ResponseData();
        CartItems cartItems = new CartItems();
        cartItems.setCartId(cartItemModel.getCartId());
        cartItems.setUserId(cartItemModel.getUserId());
        cartItems.setProductDetailId(cartItemModel.getProductDetailId());
        cartItems.setQuantity(cartItemModel.getQuantity());
        cartItems.setCreatedDate(cartItemModel.getCreatedDate());
        cartItems.setCreatedBy(cartItemModel.getCreatedBy());
        cartItems.setUpdatedDate(cartItemModel.getUpdatedDate());
        cartItems.setUpdatedBy(cartItemModel.getUpdatedBy());
        responseData.setStatus(true);
        cartItemRepository.save(cartItems);
        responseData.setResponseData(cartItems);
        return ResponseEntity.ok(responseData)  ;
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseData> detete (@RequestBody CartItemModel cartItemModel){
        ResponseData responseData = new ResponseData();
        cartItemRepository.deleteById(cartItemModel.getCartId());
        responseData.setStatus(true);
        return ResponseEntity.ok(responseData);
    }
}
