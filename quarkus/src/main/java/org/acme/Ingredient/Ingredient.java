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

    @Column(nullable = false, length = 50)
    public String name;

    @Column(nullable = true, length = 100)
    public String brand;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    public UnitEnum unit;

    @Column(nullable = true, length = 3)
    public Integer kcal;

    @Column(nullable = true, length = 3)
    public Integer carbs;

    @Column(nullable = true, length = 3)
    public Integer protein;

    @Column(nullable = true, length = 3)
    public Integer fat;

    @OneToMany(mappedBy = "ingredient", fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("amount-ingredient")
    public List<Amount> amounts = new ArrayList<>();

    public String getUnit() {
        return unit.name();
    }

    public String getUnitVerbose() {
        return unit.getUnitVerbose();
    }

    public void setBrand(String newBrand) {
        if (newBrand == "") {
            brand = null;
            return;
        }

        brand = newBrand;
    }

    public void setUnit(String newUnit) {
        try {
            unit = UnitEnum.valueOf(newUnit);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Einheit muss 'G', 'ML' oder 'PIECE' sein.");
        }
    }

    public void setKcal(Integer newKcal) {
        if (newKcal == null) {
            kcal = null;
            return;
        }
        this.checkInteger(newKcal);
        kcal = newKcal;
    }

    public void setCarbs(Integer newCarbs) {
        if (newCarbs == null) {
            carbs = null;
            return;
        }
        this.checkInteger(newCarbs);
        carbs = newCarbs;
    }

    public void setProtein(Integer newProtein) {
        if (newProtein == null) {
            protein = null;
            return;
        }
        this.checkInteger(newProtein);
        protein = newProtein;
    }

    public void setFat(Integer newFat) {
        if (newFat == null) {
            fat = null;
            return;
        }
        this.checkInteger(newFat);
        fat = newFat;
    }

    private void checkInteger(Integer value) {
        if (value < 0 || value > 999) {
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
    }

    public void addAmount(Amount newAmount) {
        amounts.add(newAmount);
    }

    public Ingredient() {
    }

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
