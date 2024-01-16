package org.acme.Amount;

import java.util.List;
import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/amounts")
public class AmountResource {
    private static final Logger log = Logger.getLogger(AmountResource.class);

    @Inject AmountService amountService;

    @GET
    public List<Amount> getAll(){
        log.info("GET: getting all amounts ...");
        return amountService.getAll();
    }    
}
