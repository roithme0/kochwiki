package org.acme.Step;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import jakarta.persistence.UniqueConstraint;

import org.acme.Recipe.Recipe;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
// unique constraints prevented updating recipes
// @Table(uniqueConstraints = {
// @UniqueConstraint(columnNames = {"index", "recipe_id"})
// })
public class Step extends PanacheEntity {

    @Column(nullable = false, length = 2)
    public Integer index;

    @Column(nullable = false, length = 200)
    public String description;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference("recipe-steps")
    public Recipe recipe;

    public Long getRecipeId() {
        return recipe.id;
    }

    public void setIndex(Integer newIndex) {
        if (newIndex < 0 || newIndex > 99) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        index = newIndex;
    }

    public Step() {
    }

    public Step(
            Integer index,
            String description) {
        this.index = index;
        this.description = description;
    }
}
