package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.dto.OrderDetailDTO;

import java.util.List;

public interface OnlineOrderService {
    List<OnlineOrderDTO> getAllOrders();

    OnlineOrderDTO getOrderById(int id);

    int postOrder(OnlineOrderDTO onlineOrderDTO);

    int deleteOrder(int id);

    List<OnlineOrderDTO> getOrderByUserId(int id);

    int addProduct(OrderDetailDTO orderDetailDTO);

    int removeProduct(OrderDetailDTO orderDetailDTO);

    int updateProduct(OrderDetailDTO orderDetailDTO);

    int setAsFinished(int id);
}

