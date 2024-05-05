package com.coffeeshop.coffeeshop.mapper;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.dto.OrderDetailDTO;
import com.coffeeshop.coffeeshop.dto.ProductDTO;
import com.coffeeshop.coffeeshop.entity.Online_orders;
import com.coffeeshop.coffeeshop.entity.Order_details;
import com.coffeeshop.coffeeshop.entity.Orders;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.repository.OrderDetailRepository;
import com.coffeeshop.coffeeshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class DTOMapper {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    public Products toProductEntity(ProductDTO productDTO) {
        Products product = new Products();
        product.setName(productDTO.getName());
        product.setDiscount(BigDecimal.valueOf(productDTO.getDiscount()));
        product.setListPrice(productDTO.getList_price());
        product.setState(productDTO.getState());
        product.setType(productDTO.getType());
        product.setImage(Base64.getDecoder().decode(productDTO.getImage()));
        product.setRating(BigDecimal.valueOf(productDTO.getRating()));
        return product;
    }

    public ProductDTO toProductDTO(Products product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setDiscount(product.getDiscount().doubleValue());
        productDTO.setList_price(product.getListPrice());
        productDTO.setState(product.getState());
        productDTO.setType(product.getType());
        productDTO.setImage(Base64.getEncoder().encodeToString(product.getImage()));
        productDTO.setRating(product.getRating().doubleValue());
        return productDTO;
    }

    public OrderDetailDTO toOrderDetailDTO(Order_details orderDetail) {
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setOrder_id(orderDetail.getOrderId());
        orderDetailDTO.setProduct_id(orderDetail.getProductId());
        orderDetailDTO.setQuantity(orderDetail.getQuantity());
        orderDetailDTO.setCost(orderDetail.getCost());
        return orderDetailDTO;
    }

    public OnlineOrderDTO toOnlineOrderDTO(Online_orders onlineOrder) {
        OnlineOrderDTO onlineOrderDTO = new OnlineOrderDTO();
        onlineOrderDTO.setOrder_details(new ArrayList<>());
        onlineOrderDTO.setId(onlineOrder.getId());
        onlineOrderDTO.setDelivery_charges(onlineOrder.getDelivery_charges());
        onlineOrderDTO.setDelivery_address(onlineOrder.getDelivery_address());
        onlineOrderDTO.setAccount_id(onlineOrder.getAccount().getId());
        Orders order = onlineOrder.getOrders();
        onlineOrderDTO.setType(order.getType());
        onlineOrderDTO.setState(order.getState());
        onlineOrderDTO.setStart_time(order.getStart_time());
        onlineOrderDTO.setEnd_time(order.getEnd_time());
        onlineOrderDTO.setTotal_cost(order.getTotal_cost());
        onlineOrderDTO.setTotal_quantity(order.getTotal_quantity());
        onlineOrderDTO.setEmployee_id(order.getEmployee().getId());
        List<Order_details> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());
        for (Order_details orderDetail : orderDetails) {
            onlineOrderDTO.getOrder_details().add(toOrderDetailDTO(orderDetail));
        }
        return onlineOrderDTO;
    }
}
