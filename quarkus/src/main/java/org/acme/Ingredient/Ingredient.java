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
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name", "brand"})
})
public class Ingredient extends PanacheEntity {

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = true, length = 100)
    private String brand;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private UnitEnum unit;

    @Column(nullable = true, length = 3)
    private Integer kcal;

    @Column(nullable = true, length = 3)
    private Integer carbs;

    @Column(nullable = true, length = 3)
    private Integer protein;

    @Column(nullable = true, length = 3)    
    private Integer fat;

    @OneToMany(mappedBy = "ingredient", fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("amount-ingredient")
    private List<Amount> amounts = new ArrayList<>();

    public Long getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBrand() {
        return brand;
    }

    public String getUnit() {
        return unit.name();
    }

    public String getUnitVerbose() {
        return unit.getUnitVerbose();
    }

    public Integer getKcal() {
        return kcal;
    }

    public Integer getCarbs() {
        return carbs;
    }

    public Integer getProtein() {
        return protein;
    }

    public Integer getFat() {
        return fat;
    }

    public List<Amount> getAmounts() {
        return amounts;
    }

    public void setName(String newName) {
        name = newName;
    }

    public void setBrand(String newBrand) {
        brand = newBrand;
    }

    public void setUnit(String newUnit) {
        try {
            unit = UnitEnum.valueOf(newUnit);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Einheit muss 'g[G]', 'ml[ML]' oder 'Stk.[PIECE]' sein.");
        }
    }

    public void setKcal(Integer newKcal) {
        if (newKcal == null) {
            kcal = null;
        } else {
            this.checkInteger(newKcal);
            kcal = newKcal;
        }
    }

    public void setCarbs(Integer newCarbs) {
        if (newCarbs == null) {
            carbs = null;
        } else {
            this.checkInteger(newCarbs);
            carbs = newCarbs;
        }
    }

    public void setProtein(Integer newProtein) {
        if (newProtein == null) {
            protein = null;
        } else {
            this.checkInteger(newProtein);
            protein = newProtein;
        }
    }

    public void setFat(Integer newFat) {
        if (newFat == null) {
            fat = null;
        } else {
            this.checkInteger(newFat);
            fat = newFat;
        }
    }

    private void checkInteger(Integer value) {
        if (value < 0 || value > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
    }

    public void addAmount(Amount newAmount) {
        amounts.add(newAmount);
    }

    public Ingredient() {}

    public Ingredient(
        String name,
        String brand, 
        String unit, 
        Integer kcal, 
        Integer carbs, 
        Integer protein,
        Integer fat
        ) {
        this.setName(name);
        this.setBrand(brand);
        this.setUnit(unit);
        this.setKcal(kcal);
        this.setCarbs(carbs);
        this.setProtein(protein);
        this.setFat(fat);
    }
}
