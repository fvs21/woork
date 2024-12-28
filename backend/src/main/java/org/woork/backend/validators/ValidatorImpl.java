package org.woork.backend.validators;

import jakarta.validation.*;
import org.springframework.stereotype.Component;
import org.woork.backend.exceptions.exceptions.ValidationException;

import java.util.List;
import java.util.Set;

@Component
public class ValidatorImpl implements CustomBeanValidator {
    ValidatorFactory factory;

    public ValidatorImpl() {
        this.factory = Validation.buildDefaultValidatorFactory();
    }

    @Override
    public <T> void validateFields(T object) {
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<T>> constraintViolations = validator.validate(object);

        if(!constraintViolations.isEmpty()) {
            List<String> allErrors = constraintViolations.stream().map(
                    ConstraintViolation::getMessage
            ).toList();
            throw new ValidationException("Validation errors", allErrors);
        }
    }
}
