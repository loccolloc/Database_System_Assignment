package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.dto.OrderDetailDTO;
import com.coffeeshop.coffeeshop.service.OnlineOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OnlineOrderService onlineOrderService;

    @GetMapping("/all")
    public List<OnlineOrderDTO> getAllOnlineOrders() {
        return onlineOrderService.getAllOrders();
    }

    @GetMapping("/get/{id}")
    public OnlineOrderDTO getOnlineOrderById(@PathVariable int id) {
        return onlineOrderService.getOrderById(id);
    }

    @GetMapping("/getByUserId/{id}")
    public List<OnlineOrderDTO> getOnlineOrderByUserId(@PathVariable int id) {
        return onlineOrderService.getOrderByUserId(id);
    }

    @GetMapping("/getLatestByUserId/{id}")
    public OnlineOrderDTO getLatestOnlineOrderByUserId(@PathVariable int id) {
        return onlineOrderService.getLatestOrderByUserId(id);
    }

    @PostMapping("/post")
    public int postOnlineOrder(@RequestBody OnlineOrderDTO onlineOrderDTO) {
        return onlineOrderService.postOrder(onlineOrderDTO);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteOnlineOrder(@PathVariable int id) {
        return onlineOrderService.deleteOrder(id);
    }

    @PutMapping("/addProduct")
    public int addProduct(@RequestBody OrderDetailDTO orderDetailDTO) {
        return onlineOrderService.addProduct(orderDetailDTO);
    }

    @PutMapping("/removeProduct")
    public int removeProduct(@RequestBody OrderDetailDTO orderDetailDTO) {
        return onlineOrderService.removeProduct(orderDetailDTO);
    }

    @PutMapping("/updateProduct")
    public int updateProduct(@RequestBody OrderDetailDTO orderDetailDTO) {
        return onlineOrderService.updateProduct(orderDetailDTO);
    }

    @PutMapping("/setAsFinished/{id}")
    public int setAsFinished(@PathVariable int id){
        return onlineOrderService.setAsFinished(id);
    }

}
