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

@Path("/recipes")
public class RecipeResource {
    private static final Logger log = Logger.getLogger(RecipeResource.class);

    @Inject RecipeService recipeService;

    @GET
    public List<Recipe> getAll(){
        log.info("GET: getting all recipes ...");
        return recipeService.getAll();
    }    

    @GET
    @Path("/{id}")
    public Recipe getById(@PathParam("id") Long id){
        log.info("GET: getting recipe by id '" + id + "' ...");
        return recipeService.getById(id);
    }    

    @POST
    public Recipe create(Recipe recipe){
        log.info("POST: creating recipe '" + recipe.getName() + "' ...");
        return recipeService.create(recipe);
    }

    @PATCH
    @Path("/{id}")
    public Recipe patch(@PathParam("id") Long id, Map<String, Object> updates){
        log.info("PATCH: patching recipe with id '" + id + "' ...");
        return recipeService.patch(id, updates);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id){
        Recipe entity = Recipe.findById(id);
        log.info("DELETE: deleting recipe '" + entity.getName() + "' ...");
        recipeService.delete(id);
    }
}
