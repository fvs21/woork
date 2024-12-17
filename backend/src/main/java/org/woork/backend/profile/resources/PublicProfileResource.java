package org.woork.backend.profile.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.profile.records.TimeInPlatform;
import org.woork.backend.user.User;

import java.time.LocalDate;
import java.time.Period;

@Getter
@Setter
public class PublicProfileResource {
    private String firstName;
    private String about;
    private boolean phoneVerified;
    private boolean emailVerified;
    private boolean identityVerified;
    private String pfp_url;
    private TimeInPlatform timeInPlatform;

    public PublicProfileResource(User user) {
        this.firstName = user.getFirstName();
        this.about = user.getAbout();
        this.phoneVerified = user.hasPhoneVerified();
        this.emailVerified = user.hasEmailVerified();
        this.identityVerified = user.hasIdentityVerified();
        this.pfp_url = "http://localhost:8000" + user.getProfilePictureUrl();
        this.timeInPlatform = calculateTimeInPlatform(user.getCreatedAt());
    }

    private TimeInPlatform calculateTimeInPlatform(LocalDate creation) {
        int months = Period.between(creation, LocalDate.now()).getMonths();
        return new TimeInPlatform(
                ((months / 12) <= 0) ? months : months / 12,
                (months < 12) ? "months" : "years"
        );
    }
}
