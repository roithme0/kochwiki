package org.acme.Recipe;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import org.acme.Amount.Amount;
import org.acme.Step.Step;
// import org.jboss.logging.Logger;

@ApplicationScoped
public class RecipeService {
    // private static final Logger log = Logger.getLogger(RecipeService.class);

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
                    recipe.setOriginUrl((String) value);
                    break;
                // case "original":
                // break;
                // case "image":
                // break;
                case "amounts":
                    List<Amount> newAmounts = new ArrayList<Amount>();
                    List<LinkedHashMap<String, Object>> amountsList = (List<LinkedHashMap<String, Object>>) value;
                    for (LinkedHashMap<String, Object> amountMap : amountsList) {
                        Integer index = (Integer) amountMap.get("index");
                        Float amount = ((Integer) amountMap.get("amount")).floatValue();
                        Long ingredientId = ((Integer) amountMap.get("ingredientId")).longValue();
                        Amount newAmount = new Amount(index, amount, ingredientId);
                        newAmounts.add(newAmount);
                    }
                    recipe.setAmounts(newAmounts);
                    break;
                case "steps":
                    List<Step> newSteps = new ArrayList<Step>();
                    List<LinkedHashMap<String, Object>> stepsList = (List<LinkedHashMap<String, Object>>) value;
                    for (LinkedHashMap<String, Object> stepMap : stepsList) {
                        Integer index = (Integer) stepMap.get("index");
                        String description = (String) stepMap.get("description");
                        Step newStep = new Step(index, description);
                        newSteps.add(newStep);
                    }
                    recipe.setSteps(newSteps);
                    break;
                default:
                    throw new IllegalArgumentException("Unknown field '" + key + "'");
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
