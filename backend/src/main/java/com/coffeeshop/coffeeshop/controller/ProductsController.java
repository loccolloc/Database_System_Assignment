package com.coffeeshop.coffeeshop.controller;

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
    public List<Products> getAllProducts(){
        return productService.getAllProducts();
    }

}
