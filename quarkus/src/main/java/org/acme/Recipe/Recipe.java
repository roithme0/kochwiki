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

    static final MAX_LENGTH_NAME = 200;
    static final MAX_LENGTH_SERVINGS = 2;
    static final MAX_LENGTH_PREPTIME = 3;
    static final MAX_LENGTH_ORIGINNAME = 200;
    static final MAX_LENGTH_ORIGINURL = 200;

    /**
     * Name of the recipe.
     */
    @Column(unique = true, nullable = false, length = MAX_LENGTH_NAME)
    public String name;

    /**
     * Number of servings the recipe is for.
     */
    @Column(nullable = false, length = MAX_LENGTH_SERVINGS)
    public Integer servings;

    /**
     * Preparation time of the recipe in minutes.
     */
    @Column(nullable = true, length = MAX_LENGTH_PREPTIME)
    public Integer preptime;

    /**
     * Name of the origin of the recipe.
     */
    @Column(nullable = true, length = MAX_LENGTH_ORIGINNAME)
    public String originName;

    /**
     * URL of the origin of the recipe.
     */
    @Column(nullable = true, length = MAX_LENGTH_ORIGINURL)
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
    public void setServings(final Integer newServings) {
        static final Integer MIN_SERVINGS = 0;
        static final Integer MAX_SERVINGS = 99;

        if (newServings <= MIN_SERVINGS || newServings > MAX_SERVINGS) {
            throw new IllegalArgumentException(String.format("Wert muss zwischen %d und %d liegen.", MIN_SERVINGS, MAX_SERVINGS));
        }
        servings = newServings;
    }

    /**
     * Set preparation time of recipe.
     * Check for invalid values.
     */
    public void setPreptime(final Integer newPreptime) {
        static final Integer MIN_PREPTIME = 0;
        static final Integer MAX_PREPTIME = 999;
        
        if (newPreptime == null) { // allow null values
            return;
        }
        if (newPreptime <= MIN_PREPTIME || newPreptime > MAX_PREPTIME) {
            throw new IllegalArgumentException(String.format("Wert muss zwischen %d und %d liegen.", MIN_PREPTIME, MAX_PREPTIME));
        }
        preptime = newPreptime;
    }

    /**
     * Set url of origin of recipe.
     * Check for invalid values.
     * Convert to URL.
     */
    public void setOriginUrl(final String newOriginUrl) {
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
    public void setAmounts(final List<Amount> newAmounts) {
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
    public void addAmount(final Amount newAmount) {
        amounts.add(newAmount);
        newAmount.setRecipe(this);
    }

    /**
     * Remove single amount from recipe.
     */
    public void removeAmount(final Amount amount) {
        amounts.remove(amount);
        amount.setRecipe(null);
    }

    /**
     * Replace steps of recipe.
     */
    public void setSteps(final List<Step> newSteps) {
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
    public void addStep(final Step newStep) {
        steps.add(newStep);
        newStep.recipe = this;
    }

    /**
     * Remove single step from recipe.
     */
    public void removeStep(final Step step) {
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
