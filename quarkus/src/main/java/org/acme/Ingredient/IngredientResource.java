package org.acme.Ingredient;

import java.util.List;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/ingredients")
public class IngredientResource {
    private static final Logger log = Logger.getLogger(IngredientResource.class);

    @Inject IngredientService ingredientService;

    @GET
    public List<Ingredient> getAll() {
        log.info("GET: getting all ingredients ...");
        return ingredientService.getAll();
    }

    @GET
    @Path("/{id}")
    public Ingredient getById(@PathParam("id") Long id) {
        log.info("GET: getting ingredient with id '" + id + "' ...");
        return ingredientService.getById(id);
    }

    @POST
    @Transactional
    public Ingredient create(Ingredient ingredient) {
        log.info("POST: creating ingredient '" + ingredient.getName() + "' ...");
        return ingredientService.create(ingredient);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Ingredient update(@PathParam("id") Long id, Ingredient ingredient) {
        log.info("PUT: updating ingredient with id '" + id + "' ...");
        return ingredientService.update(id, ingredient);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        log.info("DELETE: deleting ingredient with id '" + id + "' ...");
        ingredientService.delete(id);
    }
}
