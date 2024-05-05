package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;

import java.util.List;

public interface OnlineOrderService {
    List<OnlineOrderDTO> getAllOrders();
    OnlineOrderDTO getOrderById(int id);
    int postOrder(OnlineOrderDTO onlineOrderDTO);
    int deleteOrder(int id);
    int putOrder(OnlineOrderDTO OnlineOrderDTO);

    List<OnlineOrderDTO> getOrderByUserId(int id);
}
