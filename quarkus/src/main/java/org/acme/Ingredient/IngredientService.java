package org.acme.Ingredient;

import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class IngredientService {

    public List<Ingredient> getAll() {
        return Ingredient.listAll();
    }

    public Ingredient getById(Long id) {
        return Ingredient.findById(id);
    }

    public Ingredient create(Ingredient ingredient) {
        ingredient.persist();
        return ingredient;
    }

    public Ingredient update(Long id, Ingredient ingredient) {
        Ingredient entity = Ingredient.findById(id);
        entity.setName(ingredient.getName());
        entity.setBrand(ingredient.getBrand());
        entity.setUnit(ingredient.getUnit());
        entity.setKcal(ingredient.getKcal());
        entity.setCarbs(ingredient.getCarbs());
        entity.setProtein(ingredient.getProtein());
        entity.setFat(ingredient.getFat());
        return entity;
    }

    public void delete(Long id) {
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }
}
