package org.acme.Ingredient;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;

import java.util.Map;
import java.util.HashMap;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class IngredientResourceTest {

    private Ingredient ingredient = new Ingredient("Nudeln", "Barilla", "G", 360, null, null, null);

    @Inject
    IngredientResource ingredientResource;

    @Test
    public void patchShouldUpdateName() {
        Map<String, Object> updates = new HashMap<>();
        updates.put("name", "Spaghetti");
        Ingredient patchedIngredient = ingredientResource.patch(ingredient, updates);
        assertEquals(patchedIngredient, new Ingredient("Spaghetti", "Barilla", "G", 360, null, null, null));
    }
}
