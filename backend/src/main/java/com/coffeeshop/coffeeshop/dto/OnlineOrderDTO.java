package com.coffeeshop.coffeeshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnlineOrderDTO {
    private int id;
    private Date start_time;
    private Date end_time;
    private int total_cost;
    private int total_quantity;
    private String state = "process";
    private String type;
    private int employee_id;
    private int account_id;
    private String delivery_address;
    private int delivery_charges;
    private List<OrderDetailDTO> order_details;
}
