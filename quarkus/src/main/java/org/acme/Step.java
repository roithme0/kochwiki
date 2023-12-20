package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
// unique constraints prevented updating recipes
// @Table(uniqueConstraints = {
//     @UniqueConstraint(columnNames = {"index", "recipe_id"})
// })
public class Step extends PanacheEntity {
    private static final Logger log = Logger.getLogger(Step.class);

    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 200)
    private String description;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference("recipe-steps")
    private Recipe recipe;

    public Integer getIndex() {
        return index;
    }

    public String getDescription() {
        return description;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public Long getRecipeId() {
        return recipe.getId();
    }

    public void setIndex(Integer newIndex) {
        if (newIndex < 0 || newIndex > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        index = newIndex;
    }

    public void setDescription(String newDescription) {
        description = newDescription;
    }

    public void setRecipe(Recipe newRecipe) {
        recipe = newRecipe;
    }

    public Step() {
    }

    public Step(
        Integer index, 
        String description
        ) {
        this.setIndex(index);
        this.setDescription(description);
    }
}
