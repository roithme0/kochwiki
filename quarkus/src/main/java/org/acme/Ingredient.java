package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Ingredient extends PanacheEntity {
    private Long id;
    private String name;
    private String brand;
    private String unit;
    private Integer kcal;
    private Integer carbs;
    private Integer protein;
    private Integer fat;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
