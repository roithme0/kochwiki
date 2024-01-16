package org.acme.Recipe;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class RecipeService {
    
    public List<Recipe> getAll() {
        return Recipe.listAll();
    }

    public Recipe getById(Long id) {
        return Recipe.findById(id);
    }

    @Transactional
    public Recipe create(Recipe recipe) {
        recipe.persist();
        return recipe;
    }

    @Transactional
    public Recipe update(Long id, Recipe recipe) {
        Recipe entity = Recipe.findById(id);
        entity.setName(recipe.getName());
        entity.setServings(recipe.getServings());
        entity.setPreptime(recipe.getPreptime());
        entity.setOriginName(recipe.getOriginName());
        entity.setOriginUrl(recipe.getOriginUrl());
        // entity.setOriginal(recipe.getOriginal());
        // entity.setImage(recipe.getImage());
        entity.setAmounts(recipe.getAmounts());
        entity.setSteps(recipe.getSteps());
        return entity;
    }

    @Transactional
    public void delete(Long id) {
        Recipe entity = Recipe.findById(id);
        entity.delete();
    }
}
