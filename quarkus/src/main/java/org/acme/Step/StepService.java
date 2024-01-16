package org.acme.Step;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StepService {
    
    public List<Step> getAll() {
        return Step.listAll();
    }
}
