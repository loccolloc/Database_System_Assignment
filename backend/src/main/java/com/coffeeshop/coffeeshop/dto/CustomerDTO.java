package com.coffeeshop.coffeeshop.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private int id;
    private int account_id;
    private String last_name;
    private String first_name;
    private String gender;
    private String locations;
    private String phone_number;
}
