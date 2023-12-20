package org.acme;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UnitEnum {
    G("g"),
    ML("ml"),
    PIECE("Stk.");
    
    private final String unit;

    private UnitEnum(String newUnit) {
        unit = newUnit;
    }

    public String getUnitVerbose() {
        return unit;
    }
}
