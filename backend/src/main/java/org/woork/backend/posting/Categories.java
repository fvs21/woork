package org.woork.backend.posting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public enum Categories {
    JARDINERIA("8DV7AS"),
    PLOMERIA("4B2MK6"),
    ELECTRICIDAD("1P0HBC"),
    MASCOTAS("2HZ3PL"),
    HOGAR("G6S7JK"),
    VEHICULOS("0PJD4M"),
    CARPINTERIA("M6BZK0"),
    ALBANILERIA("R2ZLKA"),
    ALBERCAS("8NASND"),
    CANCELERIA("KM0Q29"),
    DECORACIONES("P10CSA"),
    PINTURA("NBJD0S"),
    IMPERMEABLIZADO("3NMAZS"),
    MUEBLES("JK89XS"),
    INSTALACION("BHDUS3");

    public final String code;

    Categories(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return code;
    }

    public static String[] getNames() {
        return Stream.of(Categories.values())
                .map(Categories::name)
                .toArray(String[]::new);
    }

    public static List<String> getCodes() {
        return Stream.of(Categories.values()).map(Categories::toString).toList();
    }

    private static final Map<String, Categories> stringToCategory = new HashMap<>();
    static {
        for(Categories type : Categories.values()) {
            stringToCategory.put(type.toString(), type);
        }
    }

    public static Categories fromCode(String code) {
        return stringToCategory.get(code);
    }
}
