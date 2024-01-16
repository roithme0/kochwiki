package org.acme.Recipe;

import java.util.List;
import java.util.Map;
import java.net.MalformedURLException;
import java.net.URL;

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
    public Recipe patch(Long id, Map<String, Object> updates) {
        // check if recipe exists
        // update all fields except id if not null
        Recipe recipe = Recipe.findById(id);
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe with id " + id + " does not exist");
        }

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value != null) {
                switch (key) {
                    case "name":
                        recipe.setName((String) value);
                        break;
                    case "servings":
                        recipe.setServings((Integer) value);
                        break;
                    case "preptime":
                        recipe.setPreptime((Integer) value);
                        break;
                    case "originName":
                        recipe.setOriginName((String) value);
                        break;
                    case "originUrl":
                        try {
                            recipe.setOriginUrl(new URL((String) value));
                        } catch (MalformedURLException e) {
                            throw new IllegalArgumentException("Invalid URL format for 'originUrl'", e);
                        }
                        break;
                    // case "original":
                    //     break;
                    // case "image":
                    //     break;
                    case "amounts":
                        // recipe.setAmounts((List<Amount>) value);
                        break;
                    case "steps":
                        // recipe.setSteps((List<Step>) value);
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown field '" + key + "'");
                }
            }
        }
        return recipe;
    }

    @Transactional
    public void delete(Long id) {
        Recipe entity = Recipe.findById(id);
        entity.delete();
    }
}
