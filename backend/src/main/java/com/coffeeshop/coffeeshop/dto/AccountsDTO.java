package com.coffeeshop.coffeeshop.dto;

import lombok.Data;

@Data
public class AccountsDTO {
    private int id;
    private String username;
    private String password;
    private String display_name;
    private String role;
    private String point;
}
