package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
public class ProductsController {
    @Autowired
    ProductService productService;

    @GetMapping("/all")
    public List<Products> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/get/{id}")
    public Products getProductById(@PathVariable int id) {
        return productService.getProductById(id);
    }

    @PostMapping("/post")
    public int postProduct(@RequestBody Products product) {
        return productService.postProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteProduct(@PathVariable int id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/availableGift")
    public List<Gifts> availableGift(@RequestParam String username){
        return productService.availableGift(username);
    }

    @GetMapping("/exGifts")
    public int exchangeGifts(@RequestParam int id, @RequestParam int quantity, @RequestParam int price){
        return productService.exchangeGifts(id, quantity, price);
    }
}
