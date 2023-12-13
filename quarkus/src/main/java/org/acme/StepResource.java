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

@Path("/steps")
public class StepResource {
    private static final Logger LOG = Logger.getLogger(StepResource.class.getName());

    @GET
    public List<Step> getAll(){
        LOG.info("GET: getting all steps");
        return Step.listAll();
    }    
}
