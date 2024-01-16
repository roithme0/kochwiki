package org.acme.Amount;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AmountService {
    
    public List<Amount> getAll() {
        return Amount.listAll();
    }
}
