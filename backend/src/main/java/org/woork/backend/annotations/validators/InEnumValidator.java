package org.woork.backend.annotations.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.List;

public class InEnumValidator implements ConstraintValidator<InEnum, String> {
    private static final Log log = LogFactory.getLog(InEnumValidator.class);
    List<String> values;

    @Override
    public void initialize(InEnum constraintAnnotation) {
        values = new ArrayList<>();

        @SuppressWarnings("rawtypes")
        Class<? extends Enum> enumClass = constraintAnnotation.enumClass();


        for (@SuppressWarnings("rawtypes") Enum e : enumClass.getEnumConstants()) {
            values.add(e.toString().toUpperCase());
        }
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return values.contains(value.toUpperCase());
    }
}

