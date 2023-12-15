package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

@Entity
public class Amount extends PanacheEntity {
    
    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 3)
    private Float amount;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Recipe recipe;

    public Integer getIndex() {
        return index;
    }

    public Float getAmount() {
        return amount;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public Recipe getRecipe() {
        return recipe;
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

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Amount() {
    }

    public Amount(Integer index, Float amount, Ingredient ingredient) {
        this.setIndex(index);
        this.setAmount(amount);
        this.setIngredient(ingredient);
    }
}
