package org.acme;

import java.util.List;
import org.jboss.logging.Logger;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/amounts")
public class AmountResource {
    private static final Logger log = Logger.getLogger(AmountResource.class);

    @GET
    public List<Amount> getAll(){
        log.info("GET: getting all amounts ...");
        return Amount.listAll();
    }    
}
