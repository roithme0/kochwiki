package org.acme.Step;

import java.util.List;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/steps")
public class StepService {
    private static final Logger log = Logger.getLogger(StepService.class);

    @Inject
    StepResource stepResource;

    @GET
    public List<Step> findAll() {
        log.info("GET: finding all steps ...");
        return stepResource.listAll();
    }
}