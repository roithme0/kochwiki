package org.acme.IngredientMetaData;

public enum UnitEnum {
    /**
     * Grams.
     */
    G("g"),
    /**
     * Milliliters.
     */
    ML("ml"),
    /**
     * Pieces.
     */
    PIECE("Stk.");

    /**
     * Unit.
     */
    private final String unit;

    /**
     * Constructor.
     * @param newUnit unit to set.
     */
    private UnitEnum(final String newUnit) {
        unit = newUnit;
    }

    /**
     * @return Verbose name of unit.
     */
    public String getUnitVerbose() {
        return unit;
    }
}
