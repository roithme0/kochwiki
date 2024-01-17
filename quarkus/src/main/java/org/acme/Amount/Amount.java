package org.acme.Amount;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Column;

import org.acme.Ingredient.Ingredient;
import org.acme.Recipe.Recipe;
import org.acme.Recipe.RecipeResource;
import org.jboss.logging.Logger;

@Entity
// unique constraints prevented updating recipes
// @Table(uniqueConstraints = {
// @UniqueConstraint(columnNames = {"index", "recipe_id"}),
// @UniqueConstraint(columnNames = {"ingredient_id", "recipe_id"})
// })
public class Amount extends PanacheEntity {
    private static final Logger log = Logger.getLogger(Amount.class);

    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 3)
    private Float amount;

    @ManyToOne
    @JoinColumn
    @JsonBackReference("amount-ingredient")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn
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

    public Long getIngredientId() {
        return ingredient.getId();
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public Long getRecipeId() {
        return recipe.getId();
    }

    public void setIndex(Integer newIndex) {
        if (newIndex < 0 || newIndex > 99) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        index = newIndex;
    }

    public void setAmount(Float newAmount) {
        log.debug("Setting amount: " + newAmount);
        if (newAmount < 0 || newAmount > 999) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        amount = newAmount;
    }

    public void setIngredient(Ingredient newIngredient) {
        log.debug("Setting ingredient: " + ingredient);
        ingredient = newIngredient;
        ingredient.addAmount(this);
    }

    public void setIngredientId(Long ingredientId) {
        log.debug("Setting ingredient by id: " + ingredientId);
        Ingredient newIngredient = Ingredient.findById(ingredientId);
        if (newIngredient == null) {
            throw new IllegalArgumentException("Ingredient with id " + ingredientId + " does not exist");
        }
        setIngredient(newIngredient);
    }

    public void setRecipe(Recipe newRecipe) {
        recipe = newRecipe;
    }

    public Amount() {
    }

    public Amount(
            Integer index,
            Float amount,
            Long ingredientId) {
        this.setIndex(index);
        this.setAmount(amount);
        this.setIngredientId(ingredientId);
    }
}
