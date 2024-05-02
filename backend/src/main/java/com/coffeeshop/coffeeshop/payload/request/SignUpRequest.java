package com.coffeeshop.coffeeshop.payload.request;

public class SignUpRequest {
    private String username;
    private String password;
    private String display_name;
    private String role;
    public String getRole() {
        return role;
    }

    public void setType(String type) {
        this.role = role;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }
}
