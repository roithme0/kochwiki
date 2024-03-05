package org.acme.Recipe;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.ArrayList;
import java.util.List;
import java.net.URL;

import org.acme.Amount.Amount;
import org.acme.Step.Step;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe extends PanacheEntity {

    /**
     * Name of the recipe.
     */
    @Column(unique = true, nullable = false, length = 200)
    public String name;

    /**
     * Number of servings the recipe is for.
     */
    @Column(nullable = false, length = 2)
    public Integer servings;

    /**
     * Preparation time of the recipe in minutes.
     */
    @Column(nullable = true, length = 3)
    public Integer preptime;

    /**
     * Name of the origin of the recipe.
     */
    @Column(nullable = true, length = 200)
    public String originName;

    /**
     * URL of the origin of the recipe.
     */
    @Column(nullable = true, length = 200)
    public URL originUrl;

    // /**
    //  * File containing the original recipe.
    //  */
    // @Column(nullable = true)
    // public File original;

    // /**
    //  * Image of the recipe.
    //  */
    // @Column(nullable = true)
    // public File image;

    /**
     * List of amounts used in the recipe.
     */
    @OneToMany(mappedBy = "recipe", 
        cascade = CascadeType.ALL, 
        orphanRemoval = true, 
        fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("recipe-amounts")
    public List<Amount> amounts = new ArrayList<>();

    /**
     * List of steps of the recipe.
     */
    @OneToMany(mappedBy = "recipe", 
        cascade = CascadeType.ALL, 
        orphanRemoval = true, 
        fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("recipe-steps")
    public List<Step> steps = new ArrayList<>();

    /**
     * Set the number of servings of recipe.
     * Check for invalid values.
     */
    public void setServings(Integer newServings) {
        if (newServings < 0 || newServings > 99) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        servings = newServings;
    }

    /**
     * Set preparation time of recipe.
     * Check for invalid values.
     */
    public void setPreptime(Integer newPreptime) {
        if (newPreptime == null) { // allow null values
            return;
        }
        if (newPreptime < 0 || newPreptime > 999) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        preptime = newPreptime;
    }

    /**
     * Set url of origin of recipe.
     * Check for invalid values.
     * Convert to URL.
     */
    public void setOriginUrl(String newOriginUrl) {
        if (newOriginUrl == null || newOriginUrl == "") {
            originUrl = null;
            return;
        }

        try {
            originUrl = new URL(newOriginUrl);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid URL format for 'originUrl'", e);
        }
    }

    /**
     * Replace amounts used in recipe.
     */
    public void setAmounts(List<Amount> newAmounts) {
        List<Amount> oldAmounts = new ArrayList<>(amounts);
        for (Amount amount : oldAmounts) {
            this.removeAmount(amount);
        }
        for (Amount amount : newAmounts) {
            addAmount(amount);
        }
    }

    /** 
     * Add single amount to recipe.
     */
    public void addAmount(Amount newAmount) {
        amounts.add(newAmount);
        newAmount.setRecipe(this);
    }

    /**
     * Remove single amount from recipe.
     */
    public void removeAmount(Amount amount) {
        amounts.remove(amount);
        amount.setRecipe(null);
    }

    /**
     * Replace steps of recipe.
     */
    public void setSteps(List<Step> newSteps) {
        List<Step> oldSteps = new ArrayList<>(steps);
        for (Step step : oldSteps) {
            this.removeStep(step);
        }
        for (Step step : newSteps) {
            this.addStep(step);
        }
    }

    /**
     * Add single step to recipe.
     */
    public void addStep(Step newStep) {
        steps.add(newStep);
        newStep.recipe = this;
    }

    /**
     * Remove single step from recipe.
     */
    public void removeStep(Step step) {
        steps.remove(step);
        step.recipe = null;
    }

    public Recipe() {
    }

    /**
     * Used only for import.sql.
     */
    public Recipe(
            String name,
            Integer servings,
            Integer preptime,
            String originName,
            String originUrl) {
        this.name = name;
        this.setServings(servings);
        this.setPreptime(preptime);
        this.originName = originName;
        this.setOriginUrl(originUrl);
    }

    public Recipe(
            String name,
            Integer servings,
            Integer preptime,
            String originName,
            String originUrl,
            // File original,
            // File image,
            List<Amount> amounts,
            List<Step> steps) {
        this.name = name;
        this.setServings(servings);
        this.setPreptime(preptime);
        this.originName = originName;
        this.setOriginUrl(originUrl);
        this.setAmounts(amounts);
        this.setSteps(steps);
    }
}
