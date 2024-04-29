package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity(name="Vouchers")
public class Vouchers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="discount",precision = 3, scale = 2)
    private BigDecimal discount;
    @Column(name="start_time")
    private Date start_time;
    @Column(name="end_time")
    private Date end_time;
    @Column(name="min_value")
    private int min_value;
    @Column(name="max_discount",precision = 3, scale = 2)
    private BigDecimal max_discount;
    @Column(name="type")
    private String type;
    @Column(name="quantity")
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "customer_id", foreignKey = @ForeignKey(name = "customer_voucher_fk"))
    private Customers customers;
    @OneToMany(mappedBy = "voucher")
    private List<Products>productsList;
    @OneToMany(mappedBy = "vouchers")
    private List<Redeem_vouchers>redeem_vouchersList;

    public List<Redeem_vouchers> getRedeem_vouchersList() {
        return redeem_vouchersList;
    }

    public void setRedeem_vouchersList(List<Redeem_vouchers> redeem_vouchersList) {
        this.redeem_vouchersList = redeem_vouchersList;
    }

    public List<Products> getProductsList() {
        return productsList;
    }

    public void setProductsList(List<Products> productsList) {
        this.productsList = productsList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public int getMin_value() {
        return min_value;
    }

    public void setMin_value(int min_value) {
        this.min_value = min_value;
    }

    public BigDecimal getMax_discount() {
        return max_discount;
    }

    public void setMax_discount(BigDecimal max_discount) {
        this.max_discount = max_discount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Customers getCustomers() {
        return customers;
    }

    public void setCustomers(Customers customers) {
        this.customers = customers;
    }
}
