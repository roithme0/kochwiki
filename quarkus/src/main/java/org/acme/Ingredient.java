package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Ingredient extends PanacheEntity {
    
    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = true, unique = false, length = 100)
    private String brand;

    @Column(nullable = false, unique = false, length = 4)
    private String unit;

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
        return unit;
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
        this.unit = unit;
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
        String name ,
        String brand, 
        String unit, 
        Integer kcal, 
        Integer carbs, 
        Integer protein,
        Integer fat
        ) {
        this.name = name;
        this.brand = brand;
        this.unit = unit;
        this.kcal = kcal;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
    }
}
