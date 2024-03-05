package org.acme.Step;

import java.util.List;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/steps")
public class StepService {
    /**
     * Logger for this class
     */
    private static final Logger LOG = Logger.getLogger(StepService.class);

    @Inject
    private StepResource stepResource;

    @GET
    public List<Step> findAll() {
        LOG.info("GET: finding all steps ...");
        return stepResource.listAll();
    }
}