package org.acme;

import java.util.List;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/ingredients")
public class IngredientResource {

    // @GET
    // @Path("")
    // @Produces(MediaType.TEXT_PLAIN)
    // public String getAll() {
    //     List<Ingredient> ingredients = List.of(new Ingredient("Rezept 1"), new Ingredient("Rezept 2"));
    //     // List<Ingredient> ingredients = Ingredient.listAll();
    //     String names = ingredients.stream().map(ingredient-> ingredient.name)
    //     .collect(Collectors.joining (", "));
    //     return names;
    // }

    @GET
    @Path("")
    public List<Ingredient> getAll() {
        return Ingredient.listAll();
        // return List.of(new Ingredient("Rezept 1"), new Ingredient("Rezept 2"));
    }
}
