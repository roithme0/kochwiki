package org.acme;

import java.util.List;
import java.util.logging.Logger;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/recipes")
public class RecipeResource {
    private static final Logger LOG = Logger.getLogger(RecipeResource.class.getName());

    @GET
    public List<Recipe> getAll(){
        LOG.info("GET: getting all recipes");
        return Recipe.listAll();
    }    
}
