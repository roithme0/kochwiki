package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;

@Entity
public class Amount extends PanacheEntity {
    
    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 3)
    private Float amount;

    public Integer getIndex() {
        return index;
    }

    public Float getAmount() {
        return amount;
    }

    public void setIndex(Integer index) {
        if (index < 0 || index > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        this.index = index;
    }

    public void setAmount(Float amount) {
        if (amount < 0 || amount > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        this.amount = amount;
    }

    public Amount() {
    }

    public Amount(Integer index, Float amount) {
        this.setIndex(index);
        this.setAmount(amount);
    }
}
