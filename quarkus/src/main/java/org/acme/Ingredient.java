package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.UniqueConstraint;

import org.jboss.logging.Logger;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name", "brand"})
})
public class Ingredient extends PanacheEntity {
    private static final Logger LOG = Logger.getLogger(Ingredient.class);

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

    @OneToMany(mappedBy = "ingredient")
    @Column(nullable = true)
    @JsonManagedReference("amount-ingredient")
    private List<Amount> amounts = new ArrayList<>();

    public String getName() {
        return name;
    }

    public String getBrand() {
        return brand;
    }

    public String getUnit() {
        return unit.getUnit();
    }

    public String getUnitName() {
        return unit.name();
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

    public void setName(String name) {
        LOG.info("Ingredient: setting name ...");
        this.name = name;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setUnit(String unit) {
        try {
            this.unit = UnitEnum.valueOf(unit);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Einheit muss 'g', 'ml' oder 'Stk.' sein.");
        }
    }

    public void setKcal(Integer kcal) {
        if (kcal == null) {
            this.kcal = null;
        } else {
            this.checkInteger(kcal);
            this.kcal = kcal;
        }
    }

    public void setCarbs(Integer carbs) {
        if (carbs == null) {
            this.carbs = null;
        } else {
            this.checkInteger(carbs);
            this.carbs = carbs;
        }
    }

    public void setProtein(Integer protein) {
        if (protein == null) {
            this.protein = null;
        } else {
            this.checkInteger(protein);
            this.protein = protein;
        }
    }

    public void setFat(Integer fat) {
        if (fat == null) {
            this.fat = null;
        } else {
            this.checkInteger(fat);
            this.fat = fat;
        }
    }

    private void checkInteger(Integer value) {
        if (value < 0 || value > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
    }

    public void addAmount(Amount amount) {
        this.amounts.add(amount);
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
