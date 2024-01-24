package org.acme.Amount;

import java.util.List;

import org.jboss.logging.Logger;

import jakarta.ws.rs.Path;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;

@Path("/amounts")
public class AmountService {
    private static final Logger log = Logger.getLogger(AmountService.class);

    @Inject
    AmountResource amountResource;

    @GET
    public List<Amount> listAll() {
        log.info("GET: list all amounts ...");
        return amountResource.listAll();
    }
}
