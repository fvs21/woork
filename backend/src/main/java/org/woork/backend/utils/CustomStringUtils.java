package org.woork.backend.utils;

import java.text.Normalizer;

public class CustomStringUtils {
    public static String stripAccents(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
    }
}
