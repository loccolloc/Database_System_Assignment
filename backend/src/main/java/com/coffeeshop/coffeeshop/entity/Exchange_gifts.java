package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdExchange_gifts;
import com.coffeeshop.coffeeshop.entity.keys.IdRedeem_vouchers;
import jakarta.persistence.*;




@Entity(name="Exchange_gifts")
@IdClass(IdExchange_gifts.class)
public class Exchange_gifts {
    @Column(name="quantity")
    private int quantity;
    @Id
    private int account_id;


    @Id
    private int gift_id;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Accounts accounts;


    @ManyToOne
    @JoinColumn(name = "gift_id", insertable = false, updatable = false)
    private Gifts gifts;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public int getGift_id() {
        return gift_id;
    }

    public void setGift_id(int gift_id) {
        this.gift_id = gift_id;
    }

    public Accounts getAccounts() {
        return accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public Gifts getGifts() {
        return gifts;
    }

    public void setGifts(Gifts gifts) {
        this.gifts = gifts;
    }
}
