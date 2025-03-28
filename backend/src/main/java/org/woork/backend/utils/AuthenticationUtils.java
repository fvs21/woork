package org.woork.backend.utils;

import org.apache.commons.validator.routines.EmailValidator;
import org.woork.backend.exceptions.exceptions.RegistrationException;

import java.security.SecureRandom;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AuthenticationUtils {
    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
            .compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean verifyAge(String dateOfBirth) {
        try {
            LocalDate dob = LocalDate.parse(dateOfBirth, dateFormatter);
            LocalDate now = LocalDate.now();

            if(dob.isAfter(now)) {
                throw new RegistrationException("Future date is not allowed");
            }

            int age = Period.between(dob, now).getYears();

            return age >= 18;
        } catch (DateTimeException e) {
            throw new RegistrationException("Date of birth is not valid");
        }
    }

    public static boolean validateEmail(String email) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
        return matcher.matches();
    }

    public static String generateVerificationCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < 7; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

    public static boolean isEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

    public static boolean validatePassword(String password) {
        return password.length() >= 8;
    }
}
