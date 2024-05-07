package com.coffeeshop.coffeeshop.mapper;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.dto.OrderDetailDTO;
import com.coffeeshop.coffeeshop.dto.ProductDTO;
import com.coffeeshop.coffeeshop.dto.ReviewDTO;
import com.coffeeshop.coffeeshop.entity.*;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import com.coffeeshop.coffeeshop.repository.EmployeesRepository;
import com.coffeeshop.coffeeshop.repository.OrderDetailRepository;
import com.coffeeshop.coffeeshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class DTOMapper {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    AccountsRepository accountsRepository;
    @Autowired
    EmployeesRepository employeesRepository;

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
        orderDetailDTO.setProduct_name(orderDetail.getProducts().getName());
        orderDetailDTO.setImage(Base64.getEncoder().encodeToString(orderDetail.getProducts().getImage()));
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


    public ReviewDTO toReviewDTO(Reviews review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setComment(review.getComment());
        reviewDTO.setScore(review.getScore());
        reviewDTO.setCustomer_id(review.getCustomerId());
        reviewDTO.setProduct_id(review.getProductId());
        return reviewDTO;
    }

    public Reviews toReviewEntity(ReviewDTO reviewDTO) {
        Reviews review = new Reviews();
        review.setComment(reviewDTO.getComment());
        review.setScore(reviewDTO.getScore());
        review.setCustomerId(reviewDTO.getCustomer_id());
        review.setProductId(reviewDTO.getProduct_id());
        return review;
    }

    public Order_details toOrderDetailEntity(OrderDetailDTO orderDetailDTO) {
        Order_details orderDetail = new Order_details();
        orderDetail.setOrderId(orderDetailDTO.getOrder_id());
        orderDetail.setProductId(orderDetailDTO.getProduct_id());
        orderDetail.setQuantity(orderDetailDTO.getQuantity());
        return orderDetail;
    }

    public Online_orders toOnlineOrderEntity(OnlineOrderDTO onlineOrderDTO) {
        Online_orders onlineOrder = new Online_orders();
        onlineOrder.setDelivery_charges(onlineOrderDTO.getDelivery_charges());
        onlineOrder.setDelivery_address(onlineOrderDTO.getDelivery_address());
        onlineOrder.setAccount(accountsRepository.findById(onlineOrderDTO.getAccount_id()).orElseThrow());
        Orders order = new Orders();
        order.setType("online");
        order.setStart_time(new Date(System.currentTimeMillis()));
        order.setEmployee(employeesRepository.findById(onlineOrderDTO.getEmployee_id()).orElseThrow());
        order.setState("in progress");
        onlineOrder.setOrders(order);
        return onlineOrder;
    }
}
