package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.ProductDTO;
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
    public Gifts[] availableGift(@RequestParam String username){
        return productService.availableGift(username);
    }

    @GetMapping("/exGifts")
    public int exchangeGifts(@RequestParam int id, @RequestParam int quantity, @RequestParam int price){
        return productService.exchangeGifts(id, quantity, price);
    }

    @GetMapping("/getByType")
    public List<Products> getAllProductsByType(@RequestParam String type){
        return productService.getAllProductsByType(type);
    }

    @GetMapping("/getByName")
    public List<Products> getAllProductsByName(@RequestParam String name){
        return productService.getAllProductsByName(name);
    }

    @PutMapping("/put")
    public int putProduct(@RequestBody ProductDTO productDTO) {
        return productService.putProduct(productDTO);
    }

    @PutMapping("/putImage")
    public int putImage(@RequestBody ProductDTO productDTO){
        return productService.putImage(productDTO.getName(), productDTO.getImage());
    }

    @GetMapping("/getAllByPriceAsc")
    public List<Products> getAllProductsByPriceAsc(){
        return productService.getAllProductsByPriceAsc();
    }

    @GetMapping("/getAllByPriceDesc")
    public List<Products> getAllProductsByPriceDesc(){
        return productService.getAllProductsByPriceDesc();
    }
}
