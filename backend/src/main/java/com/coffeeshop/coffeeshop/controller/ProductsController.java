package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.ProductDTO;
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

    @GetMapping("/classify/{id}")
    public String classifyProducts(@PathVariable int id){
        return productService.classifyProducts(id);
    }

    @GetMapping("/calculateTotalProfitByDate")
    public int calculateTotalProfitByDate(@RequestParam String start_date, @RequestParam String end_date){
        return productService.calculateTotalProfitByDate(start_date, end_date);
    }
}
