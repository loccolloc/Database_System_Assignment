package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdProduct_details;
import com.coffeeshop.coffeeshop.entity.keys.IdRedeem_vouchers;
import jakarta.persistence.*;




@Entity(name="Product_details")
@IdClass(IdProduct_details.class)
public class Product_details {
    @Column(name="quantity")
    private int quantity;
    @Id
    private int product_id;


    @Id
    private int ingredient_id;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;


    @ManyToOne
    @JoinColumn(name = "ingredient_id", insertable = false, updatable = false)
    private Ingredients ingredients;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    public Ingredients getIngredients() {
        return ingredients;
    }

    public void setIngredients(Ingredients ingredients) {
        this.ingredients = ingredients;
    }
}
