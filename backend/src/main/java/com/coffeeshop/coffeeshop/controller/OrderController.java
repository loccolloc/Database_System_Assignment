package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
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

    @PostMapping("/post")
    public int postOnlineOrder(@RequestBody OnlineOrderDTO onlineOrderDTO) {
        return onlineOrderService.postOrder(onlineOrderDTO);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteOnlineOrder(@PathVariable int id) {
        return onlineOrderService.deleteOrder(id);
    }

    @PutMapping("/put")
    public int putOnlineOrder(@RequestBody OnlineOrderDTO OnlineOrderDTO) {
        return onlineOrderService.putOrder(OnlineOrderDTO);
    }

}
