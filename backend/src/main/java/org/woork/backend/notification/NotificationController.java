package org.woork.backend.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.notification.resources.NotificationResource;
import org.woork.backend.user.User;

import java.util.List;

@RestController
@RequestMapping("api/notification")
public class NotificationController {
    private final AuthenticationService authenticationService;
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(AuthenticationService authenticationService, NotificationService notificationService) {
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationResource> getNotifications() {
        User user = authenticationService.getCurrentUser();
        return notificationService.getNotificationForUser(user);
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
