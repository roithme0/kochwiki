package org.acme;

import java.util.Map;

import org.jboss.logging.Logger;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/ingredients-meta-data")
public class IngredientMetaDataResource {
    private static final Logger log = Logger.getLogger(IngredientResource.class);

    @GET
    @Path("/verbose-names")
    public Map<String, String> getMetadata() {
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
