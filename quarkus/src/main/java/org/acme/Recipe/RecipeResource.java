package org.acme.Recipe;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.acme.Amount.Amount;
import org.acme.Step.Step;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecipeResource implements PanacheRepository<Recipe> {

    public Recipe patch(Recipe recipe, Map<String, Object> updates) {
        // update all fields except id if not null
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            switch (key) {
                case "name":
                    recipe.name = (String) value;
                    break;
                case "servings":
                    recipe.servings = (Integer) value;
                    break;
                case "preptime":
                    recipe.preptime = (Integer) value;
                    break;
                case "originName":
                    recipe.originName = (String) value;
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
}
