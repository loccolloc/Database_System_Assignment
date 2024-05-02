package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "Accounts")
@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(
                name = "addAccount",
                procedureName = "Add_account",
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "username", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "password", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "display_name", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.OUT, name = "result", type = Integer.class)
                }

        ),
        @NamedStoredProcedureQuery(
                name = "deleteAccount",
                procedureName = "Delete_account",
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "username", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "password", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.OUT, name = "result", type = Integer.class)
                }
        ),
        @NamedStoredProcedureQuery(
                name = "changePassword",
                procedureName = "Change_password",
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "username", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "password", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN, name = "new_password", type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.OUT, name = "result", type = Integer.class)
                }
        ),
})
@Data
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "display_name")
    private String display_name;
    @Column(name = "point")
    private int point = 0;
    @OneToMany(mappedBy = "account")
    private List<Customers> customersList;
    @OneToMany(mappedBy = "account")
    private List<Online_orders> online_ordersList;
    @OneToMany(mappedBy = "accounts")
    private List<Exchange_gifts> exchange_giftsList;
}
