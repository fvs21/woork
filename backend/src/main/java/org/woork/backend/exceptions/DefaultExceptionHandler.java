package org.woork.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class DefaultExceptionHandler {
    //CONFLICT

    @ExceptionHandler({
            EmailAlreadyTakenException.class,
            PhoneNumberAlreadyTakenException.class,
            IncorrectVerificationCodeException.class,
            EmailNotAddedException.class,
            UnableToGenerateVerificationCodeException.class})
    public ResponseEntity<String> handleConflictedRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }



    //NOT FOUND

    @ExceptionHandler({
            UserDoesNotExistException.class,
            ResetTokenDoesNotExistException.class,
            ImageNotFoundException.class,
            PostingDoesNotExistException.class,
    })
    public ResponseEntity<String> handleNotFoundRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }



    //TOO MANY REQUEST

    @ExceptionHandler({
            CannotRequestResetPasswordException.class
    })
    public ResponseEntity<String> handleTooManyRequests(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.TOO_MANY_REQUESTS);
    }





    //BAD REQUEST

    @ExceptionHandler({
            IncorrectCredentialsException.class,
            CredentialsNotProvidedException.class,
            InvalidPhoneNumberException.class,
            InvalidCountryCodeException.class,
            InvalidTokenException.class,
            InvalidBearerTokenException.class,
            RegistrationException.class,
            VerificationCodeExpiredException.class,
            UnsupportedImageTypeException.class,
            InvalidLocationException.class,
            UnableToDeleteAddressException.class,
    })
    public ResponseEntity<String> handleBadRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            ValidationException.class
    })
    public ResponseEntity<List<String>> handleValidationException(Exception e) {
        return new ResponseEntity<>(((ValidationException) e).getDetails(), HttpStatus.BAD_REQUEST);
    }


    //INTERNAL SERVER ERROR

    @ExceptionHandler({
            AuthenticationErrorException.class,
            UnableToUploadImageException.class,
            UnableToDownloadImageException.class,
            UnableToCreatePostingException.class
    })
    public ResponseEntity<String> handleInternalServerError(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }



    //UNAUTHORIZED

    @ExceptionHandler({
            UserPhoneNotVerifiedException.class,
            RefreshTokenExpiredException.class,
            AccessTokenExpiredException.class,
    })
    public ResponseEntity<String> handleUnauthorizedRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }




    //FORBIDDEN

    @ExceptionHandler({
            UnableToDeletePostingException.class,
            UnableToApplyToJobException.class
    })
    public ResponseEntity<String> handleForbiddenRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }
}
