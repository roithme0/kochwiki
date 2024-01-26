package org.acme.Ingredient;

import io.quarkus.test.junit.QuarkusTest;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class IngredientTest {

    @Test
    public void brandEmptyStringShouldReturnNull() {
        Ingredient ingredient = new Ingredient("Nudeln", "", "G", null, null, null,
                null);
        assertNull(ingredient.brand);
    }
}
