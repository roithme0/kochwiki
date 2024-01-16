package org.acme.Recipe;

import java.util.List;
import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
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

    @PUT
    @Path("/{id}")
    public Recipe update(@PathParam("id") Long id, Recipe recipe){
        Recipe entity = Recipe.findById(id);
        log.info("PUT: updating recipe '" + entity.getName() + "' ...");
        return recipeService.update(id, recipe);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id){
        Recipe entity = Recipe.findById(id);
        log.info("DELETE: deleting recipe '" + entity.getName() + "' ...");
        recipeService.delete(id);
    }
}
