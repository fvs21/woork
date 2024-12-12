package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.address.requests.UpdateAddressRequest;
import org.woork.backend.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.sms.SMSService;
import org.woork.backend.token.TokenService;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AddressService addressService;
    private final ImageService imageService;
    private final SMSService smsService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            TokenService tokenService,
            AddressService addressService,
            ImageService imageService,
            SMSService smsService
    ) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.addressService = addressService;
        this.imageService = imageService;
        this.smsService = smsService;
    }

    public boolean isUserVerified(User user) {
        return user.isPhoneVerified();
    }

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

    public UserResource updateGender(User user, String gender) {
        user.setGender(gender);
        return new UserResource(userRepository.save(user));
    }

    public UserResource updateLocation(User user, UpdateAddressRequest updateAddressRequest) {
        if(user.getAddress() != null) {
            Long locationId = user.getAddress().getId();
            Address address = addressService.updateAddress(locationId, updateAddressRequest);
            user.setAddress(address);
        } else {
            Address address = addressService.createAddress(updateAddressRequest);
            user.setAddress(address);
        }

        return new UserResource(userRepository.save(user));
    }

    public UserResource uploadProfilePicture(User user, MultipartFile file) {
        Image image = imageService.uploadImage(file, "pfp");
        user.setProfilePicture(image);
        return new UserResource(userRepository.save(user));
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(UserDoesNotExistException::new);
    }
}