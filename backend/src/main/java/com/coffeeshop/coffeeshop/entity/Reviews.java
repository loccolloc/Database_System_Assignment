package com.coffeeshop.coffeeshop.entity;


import com.coffeeshop.coffeeshop.entity.keys.IdReviews;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity(name = "Reviews")
@IdClass(IdReviews.class)
public class Reviews {
    @Column(name = "comment")
    private String comment;
    @Column(name = "score")
    private int score = 5;
    @Id
    private int customerId;
    @Id
    private int productId;
    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customers customers;
    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;
}
