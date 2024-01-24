package org.acme.Step;

import java.util.List;

import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/steps")
public class StepResource implements PanacheRepository<Step> {
    private static final Logger log = Logger.getLogger(StepResource.class);

    @Inject
    StepService stepService;

    @GET
    public List<Step> getAll() {
        log.info("GET: getting all steps ...");
        return stepService.getAll();
    }
}
