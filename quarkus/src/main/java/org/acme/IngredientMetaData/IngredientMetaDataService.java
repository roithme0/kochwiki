package org.acme.IngredientMetaData;

import java.util.Map;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IngredientMetaDataService {
    
    public Map<String, String> getMetaData() {
        return IngredientMetaData.getVerboseNames();
    }

    public Map<String, String> getUnitChoices() {
        return IngredientMetaData.getUnitChoices();
    }
}
