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

@Path("/ingredients")
public class IngredientResource {
    private static final Logger LOG = Logger.getLogger(IngredientResource.class.getName());

    @GET
    public List<Ingredient> getAll() {
        LOG.info("GET: getting all ingredients");
        return Ingredient.listAll();
    }

    @GET
    @Path("/{id}")
    public Ingredient getById(@PathParam("id") Long id) {
        LOG.info("GET: getting ingredient with id: " + id);
        return Ingredient.findById(id);
    }

    @POST
    @Transactional
    public Ingredient create(Ingredient ingredient) {
        LOG.info("POST: creating ingredient: " + ingredient.getName());
        ingredient.persist();
        return ingredient;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Ingredient update(@PathParam("id") Long id, Ingredient ingredient) {
        LOG.info("PUT: updating ingredient with id: " + id);
        Ingredient entity = Ingredient.findById(id);
        entity.setName(ingredient.getName());
        entity.setBrand(ingredient.getBrand());
        entity.setUnit(ingredient.getUnitName());
        entity.setKcal(ingredient.getKcal());
        entity.setCarbs(ingredient.getCarbs());
        entity.setProtein(ingredient.getProtein());
        entity.setFat(ingredient.getFat());
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        LOG.info("DELETE: deleting ingredient with id: " + id);
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }
}
