package org.acme;

import java.util.List;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import org.jboss.logging.Logger;

@Path("/ingredients")
public class IngredientResource {
    private static final Logger LOG = Logger.getLogger(IngredientResource.class);

    @GET
    @Path("")
    public List<Ingredient> getAll() {
        LOG.info("getting all ingredients");
        return Ingredient.listAll();
    }

    @GET
    @Path("/{id}")
    public Ingredient getIngredient(@PathParam("id") Long id) {
        LOG.info("getting ingredient with id " + id);
        return Ingredient.findById(id);
    }
}
