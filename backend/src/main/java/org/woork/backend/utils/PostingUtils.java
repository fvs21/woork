package org.woork.backend.utils;


import org.woork.backend.posting.Categories;

public class PostingUtils {
    public static String convertCodeToCategory(String code) {
        Categories category = Categories.fromCode(code);

        return switch (category) {
            case JARDINERIA -> "Jardinería";
            case ELECTRICIDAD -> "Electricidad";
            case PLOMERIA -> "Plomería";
            case HOGAR -> "Hogar";
            case MASCOTAS -> "Mascotas";
            case VEHICULOS -> "Vehículos";
            case CARPINTERIA -> "Carpintería";
            case ALBANILERIA -> "Albañilería";
            case ALBERCAS -> "Albercas";
            case CANCELERIA -> "Cancelería";
            case DECORACIONES -> "Decoraciones";
            case PINTURA -> "Pintura";
            case IMPERMEABLIZADO -> "Impermeablizado";
            case MUEBLES -> "Muebles";
            case INSTALACION -> "Instalación";
        };
    }
}
