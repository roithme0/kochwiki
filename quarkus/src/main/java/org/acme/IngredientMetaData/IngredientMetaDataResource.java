package org.acme.IngredientMetaData;

import java.util.Map;

import org.acme.Ingredient.IngredientResource;
import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/ingredients-meta-data")
public class IngredientMetaDataResource {
    private static final Logger log = Logger.getLogger(IngredientResource.class);

    @Inject IngredientMetaDataService ingredientMetaDataService;

    @GET
    @Path("/verbose-names")
    public Map<String, String> getMetadata() {
        log.info("GET: getting ingredient verbose names ...");
        return ingredientMetaDataService.getMetaData();
    }

    @GET
    @Path("/unit-choices")
    public Map<String, String> getUnitChoices() {
        log.info("GET: getting ingredient unit choices ...");
        return ingredientMetaDataService.getUnitChoices();
    }
}
