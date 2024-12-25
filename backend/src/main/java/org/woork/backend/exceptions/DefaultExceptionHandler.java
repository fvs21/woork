package org.woork.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DefaultExceptionHandler {
    //CONFLICT

    @ExceptionHandler({
            EmailAlreadyTakenException.class,
            PhoneNumberAlreadyTakenException.class,
            EmailNotAddedException.class,
            UnableToGenerateVerificationCodeException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleConflictedRequest(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode() ),
                HttpStatus.CONFLICT
        );
    }



    //NOT FOUND

    @ExceptionHandler({
            UserDoesNotExistException.class,
            ResetTokenDoesNotExistException.class,
            ImageNotFoundException.class,
            NotificationDoesNotExistException.class,
            PostingDoesNotExistException.class,
            UnableToParseIdException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleNotFoundRequest(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.NOT_FOUND
        );
    }



    //TOO MANY REQUEST
    @ExceptionHandler({
            CannotRequestResetPasswordException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleTooManyRequests(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.TOO_MANY_REQUESTS
        );
    }


    @ExceptionHandler({
            IncorrectCredentialsException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleIncorrectCredentials(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.BAD_REQUEST
        );
    }


    //BAD REQUEST

    @ExceptionHandler({
            CredentialsNotProvidedException.class,
            InvalidPhoneNumberException.class,
            InvalidCountryCodeException.class,
            InvalidTokenException.class,
            RegistrationException.class,
            VerificationCodeExpiredException.class,
            UnsupportedImageTypeException.class,
            InvalidLocationException.class,
            UnableToDeleteAddressException.class,
            UnableToParseLocationException.class,
            UnableToUpdateUserException.class,
            IncorrectVerificationCodeException.class,
            AuthenticationErrorException.class,
            PasswordsDontMatchException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleBadRequest(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
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

    @ExceptionHandler({InvalidBearerTokenException.class})
    public ResponseEntity<DefaultExceptionResponse> handleInvalidBearerToken(Exception e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage()),
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
    public ResponseEntity<DefaultExceptionResponse> handleInternalServerError(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }



    //UNAUTHORIZED

    @ExceptionHandler({
            UserPhoneNotVerifiedException.class,
            RefreshTokenExpiredException.class,
            AccessTokenExpiredException.class,
            RefreshTokenNotPresentException.class,
            UserIsNotRegisteredAsWorkerException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleUnauthorizedRequest(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.UNAUTHORIZED
        );
    }


    //FORBIDDEN

    @ExceptionHandler({
            UnableToDeletePostingException.class,
            UnableToApplyToJobException.class
    })
    public ResponseEntity<DefaultExceptionResponse> handleForbiddenRequest(DefaultException e) {
        return new ResponseEntity<>(
                new DefaultExceptionResponse(e.getMessage(), e.getCode()),
                HttpStatus.FORBIDDEN
        );
    }
}
