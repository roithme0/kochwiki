package org.acme.Ingredient;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.UniqueConstraint;

import org.acme.Amount.Amount;
import org.acme.IngredientMetaData.UnitEnum;

import java.util.List;
import java.util.Objects;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = { "name", "brand" })
})
public class Ingredient extends PanacheEntity {

    /**
     * Maximum length of ingredient attributes.
     */
    private static final int MAX_LENGTH_NAME = 50;
    private static final int MAX_LENGTH_BRAND = 100;
    private static final int MAX_LENGTH_UNIT = 5;
    private static final int MAX_LENGTH_KCAL = 3;
    private static final int MAX_LENGTH_CARBS = 3;
    private static final int MAX_LENGTH_PROTEIN = 3;
    private static final int MAX_LENGTH_FAT = 3;

    /**
     * Name of the ingredient.
     */
    @Column(nullable = false, length = MAX_LENGTH_NAME)
    public String name;

    /**
     * Brand of the ingredient.
     */
    @Column(nullable = true, length = MAX_LENGTH_BRAND)
    public String brand;

    /**
     * Unit of the ingredient.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = MAX_LENGTH_UNIT)
    public UnitEnum unit;

    /**
     * Nutritional value of the ingredient.
     */
    @Column(nullable = true, length = MAX_LENGTH_KCAL)
    public Integer kcal;

    /**
     * Nutritional value of the ingredient.
     */
    @Column(nullable = true, length = MAX_LENGTH_CARBS)
    public Integer carbs;

    /**
     * Nutritional value of the ingredient.
     */
    @Column(nullable = true, length = MAX_LENGTH_PROTEIN)
    public Integer protein;

    /**
     * Nutritional value of the ingredient.
     */
    @Column(nullable = true, length = MAX_LENGTH_FAT)
    public Integer fat;

    /**
     * List of amounts the ingredient is used in.
     */
    @OneToMany(mappedBy = "ingredient", fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("amount-ingredient")
    public List<Amount> amounts = new ArrayList<>();

    /**
     * @return name of unit of ingredient.
     */
    public String getUnit() {
        return unit.name();
    }

    /**
     * @return verbose name of unit of ingredient.
     */
    public String getUnitVerbose() {
        return unit.getUnitVerbose();
    }

    /**
     * Set brand of ingredient.
     */
    public void setBrand(String newBrand) {
        if (newBrand == "") {
            brand = null;
            return;
        }
        brand = newBrand;
    }

    /**
     * Set unit of ingredient.
     */
    public void setUnit(String newUnit) {
        try {
            unit = UnitEnum.valueOf(newUnit);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Einheit muss 'G', 'ML' oder 'PIECE' sein.");
        }
    }

    /**
     * Set kcal of ingredient.
     */
    public void setKcal(Integer newKcal) {
        if (newKcal == null) {
            kcal = null;
            return;
        }
        this.checkNutritionalValue(newKcal);
        kcal = newKcal;
    }

    /**
     * Set carbs of ingredient.
     */
    public void setCarbs(Integer newCarbs) {
        if (newCarbs == null) {
            carbs = null;
            return;
        }
        this.checkNutritionalValue(newCarbs);
        carbs = newCarbs;
    }

    /**
     * Set protein of ingredient.
     */
    public void setProtein(Integer newProtein) {
        if (newProtein == null) {
            protein = null;
            return;
        }
        this.checkNutritionalValue(newProtein);
        protein = newProtein;
    }

    /**
     * Set fat of ingredient.
     */
    public void setFat(Integer newFat) {
        if (newFat == null) {
            fat = null;
            return;
        }
        this.checkNutritionalValue(newFat);
        fat = newFat;
    }

    /**
     * Check new nutritional value.
     */
    private void checkNutritionalValue(Integer value) {
        final int MIN_VALUE = 0;
        final int MAX_VALUE = 999;

        if (value < MIN_VALUE || value > MAX_VALUE) {
            throw new IllegalArgumentException(String.format("Wert muss zwischen %d und %d liegen.", MIN_VALUE, MAX_VALUE));
        }
    }

    /**
     * Add single amount to ingredient.
     */
    public void addAmount(Amount newAmount) {
        amounts.add(newAmount);
    }

    /**
     * Default constructor for hibernate.
     */
    public Ingredient() {
    }

    /**
     * Constructor for ingredient.
     */
    public Ingredient(
            String name,
            String brand,
            String unit,
            Integer kcal,
            Integer carbs,
            Integer protein,
            Integer fat) {
        this.name = name;
        this.setBrand(brand);
        this.setUnit(unit);
        this.setKcal(kcal);
        this.setCarbs(carbs);
        this.setProtein(protein);
        this.setFat(fat);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof Ingredient)) {
            return false;
        }
        Ingredient ingredient = (Ingredient) obj;
        return Objects.equals(name, ingredient.name)
                && Objects.equals(brand, ingredient.brand)
                && Objects.equals(unit, ingredient.unit)
                && Objects.equals(kcal, ingredient.kcal)
                && Objects.equals(carbs, ingredient.carbs)
                && Objects.equals(protein, ingredient.protein)
                && Objects.equals(fat, ingredient.fat);
    }
}
