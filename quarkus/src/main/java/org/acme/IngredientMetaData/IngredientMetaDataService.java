package org.acme.IngredientMetaData;

import java.util.Map;

import org.jboss.logging.Logger;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/ingredients-meta-data")
public class IngredientMetaDataService {
    private static final Logger log = Logger.getLogger(IngredientMetaDataService.class);

    @GET
    @Path("/verbose-names")
    public Map<String, String> getVerboseNames() {
        log.info("GET: getting ingredient verbose names ...");
        return IngredientMetaData.getVerboseNames();
    }

    @GET
    @Path("/unit-choices")
    public Map<String, String> getUnitChoices() {
        log.info("GET: getting ingredient unit choices ...");
        return IngredientMetaData.getUnitChoices();
    }
}