package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdOrder_details;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity(name="Order_details")
@IdClass(IdOrder_details.class)
public class Order_details {
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "cost")
    private int cost;
    @Id
    private int orderId;

    @Id
    private int productId;
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;

}
