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

    /**
     * Maximum length of the index.
     */
    private static final int MAX_LENGTH_INDEX = 2;

    /**
     * Maximum length of the description.
     */
    private static final int MAX_LENGTH_DESCRIPTION = 200;

    /**
     * Index of the step in the recipe.
     */
    @Column(nullable = false, length = MAX_LENGTH_INDEX)
    public Integer index;

    /**
     * Description of the step.
     */
    @Column(nullable = false, length = MAX_LENGTH_DESCRIPTION)
    public String description;

    /**
     * Recipe the step is used in.
     */
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
        this.setIndex(index);
        this.description = description;
    }
}
