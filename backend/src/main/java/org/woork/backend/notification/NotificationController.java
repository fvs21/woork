package org.woork.backend.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.User;

@RestController
@RequestMapping(name = "api/notification")
public class NotificationController {
    private final AuthenticationService authenticationService;
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(AuthenticationService authenticationService, NotificationService notificationService) {
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
    }

    @PostMapping("/notification_seen")
    public String notificationSeen() {
        User user = authenticationService.getCurrentUser();
        notificationService.readNotifications(user);
        return "Notifications read.";
    }

    @PutMapping("/hide")
    public String hideNotification(Long notification_id) {
        User user = authenticationService.getCurrentUser();
        notificationService.hideNotification(user, notification_id);
        return "Notification hided.";
    }
}
