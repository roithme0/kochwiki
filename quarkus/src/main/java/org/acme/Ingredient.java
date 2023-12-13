package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.UniqueConstraint;

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

    public Long getId() {
        return id;
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
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
        this.checkInteger(kcal);
        this.kcal = kcal;
    }

    public void setCarbs(Integer carbs) {
        this.checkInteger(carbs);
        this.carbs = carbs;
    }

    public void setProtein(Integer protein) {
        this.checkInteger(protein);
        this.protein = protein;
    }

    public void setFat(Integer fat) {
        this.checkInteger(fat);
        this.fat = fat;
    }

    private void checkInteger(Integer value) {
        if (value < 0 || value > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
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
