package org.acme;

public enum UnitEnum {
    G("g"),
    ML("ml"),
    PIECE("Stk.");
    
    private final String unit;

    private UnitEnum(String unit) {
        this.unit = unit;
    }

    public String getUnit() {
        return this.unit;
    }
}
