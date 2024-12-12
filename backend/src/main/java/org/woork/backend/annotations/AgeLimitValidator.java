package org.woork.backend.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.woork.backend.utils.AuthenticationUtils;

public class AgeLimitValidator implements ConstraintValidator<AgeLimit, String> {
    int minimumAge;

    @Override
    public void initialize(AgeLimit constraintAnnotation) {
        this.minimumAge = constraintAnnotation.minimumAge();
    }

    @Override
    public boolean isValid(String birthDate, ConstraintValidatorContext context) {
        if(birthDate == null)
            return false;

        return AuthenticationUtils.verifyAge(birthDate);
    }
}
