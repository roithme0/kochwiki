package org.acme.Ingredient;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class IngredientService {

    public List<Ingredient> getAll() {
        return Ingredient.listAll();
    }

    public Ingredient getById(Long id) {
        return Ingredient.findById(id);
    }

    @Transactional
    public Ingredient create(Ingredient ingredient) {
        ingredient.persist();
        return ingredient;
    }

    @Transactional
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

    @Transactional
    public void delete(Long id) {
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }
}
