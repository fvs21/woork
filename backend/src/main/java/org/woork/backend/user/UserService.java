package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.requests.UpdateAddressRequest;
import org.woork.backend.exceptions.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.sms.SMSService;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.requests.UpdateGenderRequest;
import org.woork.backend.user.resources.UserResource;
import org.woork.backend.validators.ValidatorImpl;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AddressService addressService;
    private final ImageService imageService;
    private final SMSService smsService;
    private final ValidatorImpl validatorImpl;

    @Autowired
    public UserService(
            UserRepository userRepository,
            TokenService tokenService,
            AddressService addressService,
            ImageService imageService,
            SMSService smsService,
            ValidatorImpl validatorImpl) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.addressService = addressService;
        this.imageService = imageService;
        this.smsService = smsService;
        this.validatorImpl = validatorImpl;
    }

    public boolean isUserVerified(User user) {
        return user.hasPhoneVerified();
    }

    //Mandatory function for authentication flow
    //returns User by his phone number or email
    //Contrary to what the function name implies, do not use to get a user by his username
    @Override
    public UserDetails loadUserByUsername(String emailOrPhone) throws UsernameNotFoundException {
        return getUserByEmailOrPhone(emailOrPhone);
    }

    public User getUserByEmailOrPhone(String emailOrPhone) {
        return userRepository.findByEmailOrPhone(emailOrPhone, emailOrPhone).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }


    public User getUserFromRefreshToken(String refreshToken) {
        String username = tokenService.extractUsername(refreshToken);
        return getUserByUsername(username);
    }

    public UserResource updateGender(User user, UpdateGenderRequest request) {
        String gender = request.isCustom() ? request.getOther() : request.getGender();
        if((request.isCustom() && List.of("MALE", "FEMALE").contains(gender.toUpperCase())) || gender.isEmpty()) {
            throw new UnableToUpdateUserException("Error al actualizar género.");
        } else if(!request.isCustom() && !List.of("MALE", "FEMALE").contains(gender.toUpperCase())) {
            throw new UnableToUpdateUserException("Error al actualizar género.");
        }

        user.setGender(gender);
        return new UserResource(userRepository.save(user));
    }

    public UserResource updateAddress(User user, UpdateAddressRequest updateAddressRequest) {
        validatorImpl.validateFields(updateAddressRequest);

        if(user.getAddress() != null) {
            Long locationId = user.getAddress().getId();
            Address address = addressService.updateAddress(locationId, updateAddressRequest);
            user.setAddress(address);
        } else {
            Address address = addressService.createAddress(updateAddressRequest);
            user.setAddress(address);
        }

        return new UserResource(
                userRepository.save(user)
        );
    }

    public UserResource updateProfilePicture(User user, MultipartFile file) {
        if(file.isEmpty()) {
            throw new UnableToUpdateUserException("Error al actualizar imagen.");
        }
        Image pfp = user.getProfilePicture();

        Image image = imageService.uploadImage(file, "pfp");
        user.setProfilePicture(image);
        userRepository.save(user);

        if(pfp != null)
            imageService.deleteImage(pfp);

        return new UserResource(user);
    }

    public UserResource updateDateOfBirth(User user, String newDob) {
        LocalDate date = LocalDate.parse(newDob, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        if(date.equals(user.getDateOfBirth())) {
            throw new UnableToUpdateUserException("Error al actualizar fecha de nacimiento.");
        }

        if(Period.between(date, LocalDate.now()).getYears() < 18) {
            throw new UnableToUpdateUserException("Debes ser mayor de edad para poder registrarte.");
        }
        user.setDateOfBirth(date);
        return new UserResource(userRepository.save(user));
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(UserDoesNotExistException::new);
    }
}