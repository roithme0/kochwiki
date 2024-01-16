package org.acme.Ingredient;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

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
    public Ingredient patch(Long id, Map<String, Object> updates) {
        // check if ingredient exists
        // update all fields except id and amounts if values are not null
        Ingredient ingredient = Ingredient.findById(id);
        if (ingredient == null) {
            throw new IllegalArgumentException("Ingredient with id " + id + " does not exist");
        }

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value != null) {
                switch (key) {
                    case "name":
                        ingredient.setName((String) value);
                        break;
                    case "brand":
                        ingredient.setBrand((String) value);
                        break;
                    case "unit":
                        ingredient.setUnit((String) value);
                        break;
                    case "kcal":
                        ingredient.setKcal((Integer) value);
                        break;
                    case "carbs":
                        ingredient.setCarbs((Integer) value);
                        break;
                    case "protein":
                        ingredient.setProtein((Integer) value);
                        break;
                    case "fat":
                        ingredient.setFat((Integer) value);
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown field '" + key + "'");
                }
            }
        }
        return ingredient;
    }

    @Transactional
    public void delete(Long id) {
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }
}
