package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.logging.Logger;

@Entity
public class Step extends PanacheEntity {
    private static final Logger LOG = Logger.getLogger(Step.class.getName()); 

    @Column(nullable = false, length = 2)
    private Integer index;

    @Column(nullable = false, length = 200)
    private String description;

    @ManyToOne
    @JoinColumn(nullable = false)
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

    public void setIndex(Integer index) {
        if (index < 0 || index > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        this.index = index;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Step() {
    }

    public Step(
        Integer index, 
        String description,
        Recipe recipe
        ) {
        this.setIndex(index);
        this.setDescription(description);
        this.setRecipe(recipe);
    }
}
