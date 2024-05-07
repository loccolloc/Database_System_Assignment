package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.dto.OrderDetailDTO;
import com.coffeeshop.coffeeshop.entity.Online_orders;
import com.coffeeshop.coffeeshop.entity.Order_details;
import com.coffeeshop.coffeeshop.entity.keys.IdOrder_details;
import com.coffeeshop.coffeeshop.mapper.DTOMapper;
import com.coffeeshop.coffeeshop.repository.OnlineOrderRepository;
import com.coffeeshop.coffeeshop.repository.OrderDetailRepository;
import com.coffeeshop.coffeeshop.service.OnlineOrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OnlineOrderServiceImp implements OnlineOrderService {
    @Autowired
    OnlineOrderRepository onlineOrderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    DTOMapper mapper;

    @Override
    public List<OnlineOrderDTO> getAllOrders() {
        List<OnlineOrderDTO> onlineOrderDTOs = new java.util.ArrayList<>(List.of());
        onlineOrderRepository.findAll().forEach(onlineOrder -> onlineOrderDTOs.add(mapper.toOnlineOrderDTO(onlineOrder)));
        return onlineOrderDTOs;
    }

    @Override
    public OnlineOrderDTO getOrderById(int id) {
        Online_orders onlineOrder = onlineOrderRepository.findById(id).orElse(null);
        if (onlineOrder != null) {
            return mapper.toOnlineOrderDTO(onlineOrder);
        } else return null;

    }

    @Override
    public List<OnlineOrderDTO> getOrderByUserId(int id) {
        List<OnlineOrderDTO> onlineOrderDTOs = new ArrayList<>(List.of());
        onlineOrderRepository.findAllByAccountId(id)
                .forEach(onlineOrder -> onlineOrderDTOs.add(mapper.toOnlineOrderDTO(onlineOrder)));
        return onlineOrderDTOs;
    }

    @Override
    public OnlineOrderDTO getLatestOrderByUserId(int id) {
        List<Online_orders> onlineOrders = onlineOrderRepository
                .findAllByAccountIdAndState(id, "in progress ");
        if (onlineOrders.size() == 1) {
            return mapper.toOnlineOrderDTO(onlineOrders.getFirst());
        } else return null;
    }

    @Override
    public int postOrder(OnlineOrderDTO onlineOrderDTO) {
        try {
            Online_orders onlineOrder = mapper.toOnlineOrderEntity(onlineOrderDTO);
            onlineOrderRepository.save(onlineOrder);
            return 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    @Override
    public int deleteOrder(int id) {
        if (onlineOrderRepository.existsById(id)) {
            onlineOrderRepository.deleteById(id);
            return 0;
        }
        return -1;
    }

    @Override
    public int addProduct(OrderDetailDTO orderDetailDTO) {
        Order_details orderDetail = mapper.toOrderDetailEntity(orderDetailDTO);
        if (orderDetailRepository.existsById(
                new IdOrder_details(orderDetailDTO.getOrder_id(), orderDetailDTO.getProduct_id()))) {
            return -1;
        }
        orderDetailRepository.save(orderDetail);
        return 0;
    }

    @Override
    public int removeProduct(OrderDetailDTO orderDetailDTO) {
        Online_orders onlineOrder = onlineOrderRepository.findById(orderDetailDTO.getOrder_id()).orElse(null);
        if (onlineOrder == null || onlineOrder.getOrders().getState().equals("finished    ")) {
            return -1;
        }
        IdOrder_details idOrderDetails = new IdOrder_details(orderDetailDTO.getOrder_id(), orderDetailDTO.getProduct_id());
        if (orderDetailRepository.existsById(idOrderDetails)) {
            orderDetailRepository.deleteById(idOrderDetails);
            return 0;
        } else return -1;
    }

    @Override
    @Transactional
    public int updateProduct(OrderDetailDTO orderDetailDTO) {
        Online_orders onlineOrder = onlineOrderRepository.findById(orderDetailDTO.getOrder_id()).orElse(null);
        if (onlineOrder == null || onlineOrder.getOrders().getState().equals("finished    ")) {
            return -1;
        }
        IdOrder_details idOrderDetails = new IdOrder_details(orderDetailDTO.getOrder_id(), orderDetailDTO.getProduct_id());
        Order_details orderDetail = orderDetailRepository.findById(idOrderDetails).orElse(null);
        if (orderDetail != null) {
            orderDetail.setQuantity(orderDetailDTO.getQuantity());
            return 0;
        }
        return -1;
    }

    @Override
    @Transactional
    public int setAsFinished(int id) {
        Online_orders onlineOrder = onlineOrderRepository.findById(id).orElse(null);
        if (onlineOrder != null) {
            onlineOrder.getOrders().setState("finished");
            return 0;
        } else return -1;
    }
}
