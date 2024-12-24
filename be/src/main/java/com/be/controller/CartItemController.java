package com.be.controller;

import com.be.entity.CartItems;
import com.be.model.CartItemModel;
import com.be.model.ResponseData;
import com.be.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {
    @Autowired
    private CartItemRepository cartItemRepository;

    @PostMapping("/add")
    public ResponseEntity<ResponseData> add (@RequestBody CartItemModel cartItemModel){
        ResponseData responseData = new ResponseData();
        CartItems cartItems = new CartItems();
        CartItems cartItems1 = cartItemRepository.findCartItemsByProductDetailId(cartItemModel.getProductDetailId());
        cartItems.setUserId(cartItems.getUserId());
        cartItems.setProductDetailId(cartItems.getProductDetailId());
        cartItems.setQuantity(cartItemModel.getQuantity());
        cartItems.setCreatedDate(new Date());
        cartItems.setCreatedBy(cartItemModel.getCreatedBy());
        cartItems.setUpdatedDate(cartItemModel.getUpdatedDate());
        cartItems.setUpdatedBy(cartItemModel.getUpdatedBy());
        if(cartItems1 != null){
            cartItems.setQuantity(cartItems1.getQuantity()+cartItems.getQuantity());
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
        cartItems.setCreatedDate(new Date());
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
