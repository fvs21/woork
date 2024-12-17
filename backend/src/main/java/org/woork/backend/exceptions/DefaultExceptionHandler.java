package org.woork.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Map;

@ControllerAdvice
public class DefaultExceptionHandler {
    //CONFLICT

    @ExceptionHandler({
            EmailAlreadyTakenException.class,
            PhoneNumberAlreadyTakenException.class,
            EmailNotAddedException.class,
            UnableToGenerateVerificationCodeException.class}
    )
    public ResponseEntity<DefaultExceptionResponse> handleConflictedRequest(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.CONFLICT
        );
    }



    //NOT FOUND

    @ExceptionHandler({
            UserDoesNotExistException.class,
            ResetTokenDoesNotExistException.class,
            ImageNotFoundException.class,
            NotificationDoesNotExistException.class,
            PostingDoesNotExistException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleNotFoundRequest(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }



    //TOO MANY REQUEST

    @ExceptionHandler({
            CannotRequestResetPasswordException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleTooManyRequests(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.TOO_MANY_REQUESTS
        );
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
            UnableToParseLocationException.class,
            UnableToUpdateUserException.class,
            IncorrectVerificationCodeException.class,
            AuthenticationErrorException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleBadRequest(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({
            ValidationException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleValidationException(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(((ValidationException) e).getDetails()),
                HttpStatus.BAD_REQUEST
        );
    }


    //INTERNAL SERVER ERROR

    @ExceptionHandler({
            UnableToUploadImageException.class,
            UnableToDownloadImageException.class,
            UnableToCreatePostingException.class,
            UnableToDeleteImageException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleInternalServerError(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }



    //UNAUTHORIZED

    @ExceptionHandler({
            UserPhoneNotVerifiedException.class,
            RefreshTokenExpiredException.class,
            AccessTokenExpiredException.class,
            RefreshTokenNotPresentException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleUnauthorizedRequest(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.UNAUTHORIZED
        );
    }




    //FORBIDDEN

    @ExceptionHandler({
            UnableToDeletePostingException.class,
            UnableToApplyToJobException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleForbiddenRequest(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
                HttpStatus.FORBIDDEN
        );
    }
}
