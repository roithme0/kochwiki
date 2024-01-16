package org.acme.Ingredient;

import io.quarkus.test.junit.QuarkusTest;

import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class IngredientResourceTest {

    @Test
    public void testGetAll() {
        given()
          .when().get("/ingredients")
          .then()
          .statusCode(200);
    }
}
