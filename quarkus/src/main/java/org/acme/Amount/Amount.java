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

@Entity
// unique constraints prevented updating recipes
// @Table(uniqueConstraints = {
// @UniqueConstraint(columnNames = {"index", "recipe_id"}),
// @UniqueConstraint(columnNames = {"ingredient_id", "recipe_id"})
// })
public class Amount extends PanacheEntity {

    /**
     * Index of the amount in the recipe
     */
    @Column(nullable = false, length = 2)
    public Integer index;

    /**
     * Amount of the ingredient in the recipe
     */
    @Column(nullable = false, length = 3)
    public Float amount;

    /**
     * Ingredient of the amount
     */
    @ManyToOne
    @JoinColumn
    @JsonBackReference("amount-ingredient")
    public Ingredient ingredient;

    /**
     * Recipe the amount is used in
     */
    @ManyToOne
    @JoinColumn
    @JsonBackReference("recipe-amounts")
    public Recipe recipe;

    public Long getIngredientId() {
        return ingredient.id;
    }

    public Long getRecipeId() {
        return recipe.id;
    }

    public void setIndex(Integer newIndex) {
        if (newIndex < 0 || newIndex > 99) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        index = newIndex;
    }

    public void setAmount(Float newAmount) {
        if (newAmount < 0 || newAmount > 999) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        amount = newAmount;
    }

    public void setIngredient(Ingredient newIngredient) {
        ingredient = newIngredient;
        ingredient.addAmount(this);
    }

    public void setIngredientId(Long ingredientId) {
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
