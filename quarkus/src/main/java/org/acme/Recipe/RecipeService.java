package org.acme.Recipe;

import java.util.List;
import java.util.Map;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.transaction.Transactional;

@Path("/recipes")
public class RecipeService {
    private static final Logger log = Logger.getLogger(RecipeService.class);

    @Inject
    RecipeResource recipeResource;

    @GET
    public List<Recipe> findAll() {
        log.info("GET: finding all recipes ...");
        return recipeResource.listAll();
    }

    @GET
    @Path("/{id}")
    public Recipe findById(@PathParam("id") Long id) {
        log.info("GET: finding recipe by id '" + id + "' ...");
        return recipeResource.findById(id);
    }

    @POST
    @Transactional
    public Recipe create(Recipe recipe) {
        log.info("POST: creating recipe '" + recipe.name + "' ...");
        recipeResource.persist(recipe);
        return recipe;
    }

    @PATCH
    @Transactional
    @Path("/{id}")
    public Recipe patch(@PathParam("id") Long id, Map<String, Object> updates) {
        Recipe recipe = findById(id);
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe with id " + id + " does not exist");
        }
        log.info("PATCH: patching recipe with id '" + id + "' ...");
        return recipeResource.patch(recipe, updates);
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        log.info("DELETE: deleting recipe with id '" + id + "' ...");
        Recipe entity = Recipe.findById(id);
        recipeResource.delete(entity);
    }
}
