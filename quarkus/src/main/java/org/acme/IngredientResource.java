package org.acme;

import java.util.List;
import java.util.Map;

import org.jboss.logging.Logger;

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
    @GET
    public List<Ingredient> getAll() {
        log.info("GET: getting all ingredients ...");
        return Ingredient.listAll();
    }

    @GET
    @Path("/{id}")
    public Ingredient getById(@PathParam("id") Long id) {
        log.info("GET: getting ingredient with id '" + id + "' ...");
        return Ingredient.findById(id);
    }

    @POST
    @Transactional
    public Ingredient create(Ingredient ingredient) {
        log.info("POST: creating ingredient '" + ingredient.getName() + "' ...");
        ingredient.persist();
        return ingredient;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Ingredient update(@PathParam("id") Long id, Ingredient ingredient) {
        log.info("PUT: updating ingredient with id '" + id + "' ...");
        Ingredient entity = Ingredient.findById(id);
        entity.setName(ingredient.getName());
        entity.setBrand(ingredient.getBrand());
        entity.setUnit(ingredient.getUnit());
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
        log.info("DELETE: deleting ingredient with id '" + id + "' ...");
        Ingredient entity = Ingredient.findById(id);
        entity.delete();
    }

    @GET
    @Path("/verbose-names")
    public Map<String, String> getMetadata() {
        log.info("GET: getting ingredient verbose names ...");
        return IngredientMetaData.getVerboseNames();
    }
}
