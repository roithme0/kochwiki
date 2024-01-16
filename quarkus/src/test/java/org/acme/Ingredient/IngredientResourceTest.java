package org.acme.Ingredient;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

import static org.hamcrest.CoreMatchers.is;

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
