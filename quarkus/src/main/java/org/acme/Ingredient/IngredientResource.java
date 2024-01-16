package org.acme.Ingredient;

import java.util.List;
import java.util.Map;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
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
    public Ingredient create(Ingredient ingredient) {
        log.info("POST: creating ingredient '" + ingredient.getName() + "' ...");
        return ingredientService.create(ingredient);
    }

    @PATCH
    @Path("/{id}")
    public Ingredient patch(@PathParam("id") Long id, Map<String, Object> updates) {
        log.info("PATCH: patching ingredient with id '" + id + "' ...");
        return ingredientService.patch(id, updates);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        log.info("DELETE: deleting ingredient with id '" + id + "' ...");
        ingredientService.delete(id);
    }
}
