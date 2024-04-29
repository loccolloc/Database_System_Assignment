package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;


@Entity(name="Products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="type")

    private String type;
    @Column(name="list_price",nullable = false)
    private int list_price;
    @Column(name="discount",precision = 3, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;
    @Column(name="quantity")
    private int quantity;

    @Lob
    @Column(name="image")
    private byte[] image;

    @Column(name="rating",precision = 3, scale = 2)
    private BigDecimal rating;
    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false, foreignKey = @ForeignKey(name = "voucher_product_fk"))
    private Vouchers voucher;
    @OneToMany(mappedBy = "products")
    private List<Order_details>Order_detailsList;
    @OneToMany(mappedBy = "products")
    private List<Product_details>product_detailsList;
    @OneToMany(mappedBy = "products")
    private List<Reviews>reviewsList;

    public List<Reviews> getReviewsList() {
        return reviewsList;
    }

    public void setReviewsList(List<Reviews> reviewsList) {
        this.reviewsList = reviewsList;
    }

    public List<Product_details> getProduct_detailsList() {
        return product_detailsList;
    }

    public void setProduct_detailsList(List<Product_details> product_detailsList) {
        this.product_detailsList = product_detailsList;
    }

    public List<Order_details> getOrder_detailsList() {
        return Order_detailsList;
    }

    public void setOrder_detailsList(List<Order_details> order_detailsList) {
        Order_detailsList = order_detailsList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getList_price() {
        return list_price;
    }

    public void setList_price(int list_price) {
        this.list_price = list_price;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Vouchers getVoucher() {
        return voucher;
    }

    public void setVoucher(Vouchers voucher) {
        this.voucher = voucher;
    }
}
