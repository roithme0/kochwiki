package org.acme.Ingredient;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import org.jboss.logging.Logger;

import java.util.List;
import java.util.Map;

@Path("/ingredients")
public class IngredientService {
    private static final Logger log = Logger.getLogger(IngredientService.class);

    @Inject
    IngredientResource ingredientResource;

    @GET
    public List<Ingredient> listAll() {
        log.info("GET: listing all ingredients ...");
        return ingredientResource.listAll();
    }

    @GET
    @Path("/{id}")
    public Ingredient findById(@PathParam("id") Long id) {
        log.info("GET: find ingredient with id '" + id + "' ...");
        return ingredientResource.findById(id);
    }

    @POST
    @Transactional
    public Ingredient create(Ingredient ingredient) {
        log.info("POST: creating ingredient '" + ingredient.name + "' ...");
        ingredientResource.persist(ingredient);
        return ingredient;
    }

    @PATCH
    @Path("/{id}")
    @Transactional
    public Ingredient patch(@PathParam("id") Long id, Map<String, Object> updates) {
        log.info("PATCH: patching ingredient with id '" + id + "' ...");
        return ingredientResource.patch(id, updates);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        log.info("DELETE: deleting ingredient with id '" + id + "' ...");
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }
}
