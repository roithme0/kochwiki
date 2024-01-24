package org.acme.Ingredient;

import java.util.Map;

import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IngredientResource implements PanacheRepository<Ingredient> {
    private static final Logger log = Logger.getLogger(IngredientService.class);

    public Ingredient patch(Long id, Map<String, Object> updates) {
        // check if ingredient exists
        // update all fields except id and amounts if values are not null
        Ingredient ingredient = Ingredient.findById(id);
        if (ingredient == null) {
            throw new IllegalArgumentException("Ingredient with id " + id + " does not exist");
        }

        log.debug("updates: " + updates);
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            switch (key) {
                case "name":
                    ingredient.name = (String) value;
                    break;
                case "brand":
                    ingredient.brand = (String) value;
                    break;
                case "unit":
                    ingredient.setUnit((String) value);
                    break;
                case "kcal":
                    ingredient.kcal = (Integer) value;
                    break;
                case "carbs":
                    ingredient.carbs = (Integer) value;
                    break;
                case "protein":
                    ingredient.protein = (Integer) value;
                    break;
                case "fat":
                    ingredient.fat = (Integer) value;
                    break;
                default:
                    throw new IllegalArgumentException("Unknown field '" + key + "'");
            }
        }
        return ingredient;
    }
}
