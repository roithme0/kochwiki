package org.acme;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

import org.jboss.logging.Logger;

@Entity
public class Amount extends PanacheEntity {
    private static final Logger log = Logger.getLogger(Amount.class);
    
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

    public void setIndex(Integer newIndex) {
        log.debug("Amount: setting index ...");
        if (newIndex < 0 || newIndex > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        index = newIndex;
    }

    public void setAmount(Float newAmount) {
        if (newAmount < 0 || newAmount > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        amount = newAmount;
    }

    public void setIngredient(Ingredient newIngredient) {
        log.debug("Amount: setting ingredient ...");
        ingredient = newIngredient;
        ingredient.addAmount(this);
    }

    public void setRecipe(Recipe newRecipe) {
        recipe = newRecipe;
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
