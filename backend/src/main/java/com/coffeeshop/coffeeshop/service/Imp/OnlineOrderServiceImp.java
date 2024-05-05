package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.OnlineOrderDTO;
import com.coffeeshop.coffeeshop.entity.Online_orders;
import com.coffeeshop.coffeeshop.mapper.DTOMapper;
import com.coffeeshop.coffeeshop.repository.OnlineOrderRepository;
import com.coffeeshop.coffeeshop.service.OnlineOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OnlineOrderServiceImp implements OnlineOrderService {
    @Autowired
    OnlineOrderRepository onlineOrderRepository;
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
        }
        else return null;

    }

    @Override
    public List<OnlineOrderDTO> getOrderByUserId(int id) {
        List<OnlineOrderDTO> onlineOrderDTOs = new ArrayList<>(List.of());
        onlineOrderRepository.findAllByAccountId(id)
                .forEach(onlineOrder -> onlineOrderDTOs.add(mapper.toOnlineOrderDTO(onlineOrder)));
        return onlineOrderDTOs;
    }

    @Override
    public int postOrder(OnlineOrderDTO onlineOrderDTO) {
        return 0;
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
    public int putOrder(OnlineOrderDTO onlineOrderDTO) {
        return 0;
    }
}
