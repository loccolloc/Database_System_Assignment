package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdProduct_details implements Serializable {
    @Column(name="product_id")
    private int product_id;
    @Column(name="ingredient_id")
    private int ingredient_id;
    public IdProduct_details(int product_id, int ingredient_id){
        this.product_id = product_id;
        this.ingredient_id = ingredient_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public int getIngredient_id() {
        return ingredient_id;
    }

    public void setIngredient_id(int ingredient_id) {
        this.ingredient_id = ingredient_id;
    }
}
