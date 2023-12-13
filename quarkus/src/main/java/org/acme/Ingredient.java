package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Entity
public class Ingredient extends PanacheEntity {
    
    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = true, unique = false, length = 100)
    private String brand;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = false, length = 4)
    private UnitEnum unit;

    @Column(nullable = true, unique = false, length = 3)
    private Integer kcal;

    @Column(nullable = true, unique = false, length = 3)
    private Integer carbs;

    @Column(nullable = true, unique = false, length = 3)
    private Integer protein;

    @Column(nullable = true, unique = false, length = 3)
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
            throw new IllegalArgumentException("Invalid unit value: " + unit);
        }
    }

    public void setKcal(Integer kcal) {
        this.kcal = kcal;
    }

    public void setCarbs(Integer carbs) {
        this.carbs = carbs;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
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
