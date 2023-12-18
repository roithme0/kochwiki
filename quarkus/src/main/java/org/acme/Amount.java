package org.acme;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.logging.Log;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

import java.util.logging.Logger;

@Entity
public class Amount extends PanacheEntity {
    private static final Logger LOG = Logger.getLogger(Amount.class.getName()); 
    
    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 3)
    private Float amount;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonBackReference("amount-ingredient")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonBackReference("recipe-amounts")
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
        LOG.info("Amount: setting index ...");
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
        LOG.info("Amount: setting ingredient ...");
        this.ingredient = ingredient;
        ingredient.addAmount(this);
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Amount() {
    }

    public Amount(
        Integer index, 
        Float amount, 
        Ingredient ingredient
        ) {
        this.setIndex(index);
        this.setAmount(amount);
        this.setIngredient(ingredient);
    }
}
