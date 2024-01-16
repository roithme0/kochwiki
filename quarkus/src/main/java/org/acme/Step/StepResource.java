package org.acme.Step;

import java.util.List;
import org.jboss.logging.Logger;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/steps")
public class StepResource {
    private static final Logger log = Logger.getLogger(StepResource.class);

    @GET
    public List<Step> getAll(){
        log.info("GET: getting all steps ...");
        return Step.listAll();
    }    
}
