package org.woork.backend.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.exceptions.NotificationDoesNotExistException;
import org.woork.backend.exceptions.exceptions.PostingDoesNotExistException;
import org.woork.backend.notification.models.Notification;
import org.woork.backend.notification.models.NotificationObject;
import org.woork.backend.notification.models.NotificationType;
import org.woork.backend.notification.records.NotificationData;
import org.woork.backend.notification.records.PostingApplicationNotification;
import org.woork.backend.notification.repositories.NotificationObjectRepository;
import org.woork.backend.notification.repositories.NotificationRepository;
import org.woork.backend.notification.resources.NotificationResource;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingRepository;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationObjectRepository notificationObjectRepository;
    private final SimpMessagingTemplate template;
    private final PostingRepository postingRepository;
    private final UrlService urlService;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, NotificationObjectRepository notificationObjectRepository, SimpMessagingTemplate template, PostingRepository postingRepository, UrlService urlService) {
        this.notificationRepository = notificationRepository;
        this.notificationObjectRepository = notificationObjectRepository;
        this.template = template;
        this.postingRepository = postingRepository;
        this.urlService = urlService;
    }

    public PostingApplicationNotification generatePostingApplicationNotification(Notification notification) {
        User applicant = notification.getNotificationObject().getAuthor();

        Long postingId = notification.getNotificationObject().getEntity_id();
        Posting posting = postingRepository.findPostingById(postingId).orElseThrow(PostingDoesNotExistException::new);
        String postingUrl = urlService.encodeIdToUrl(postingId);

        return new PostingApplicationNotification(
                applicant.getFullName(),
                "/profile/show/" + applicant.getUsername(),
                posting.getTitle(),
                "/posting/" + postingUrl
        );
    }

    public void generateAndSendNotificationPayload(NotificationType type, Notification notification) {
        switch (type) {
            case JOB_APPLICATION -> {
                PostingApplicationNotification not = generatePostingApplicationNotification(notification);
            }
            case NEW_MESSAGE -> {
            }
            case ACCEPTED_APPLICATION -> {
            }
        }
    };

    public void createAndSendNotification(User author, NotificationData data) {
        NotificationObject notificationObject = new NotificationObject();
        notificationObject.setEntity_id(data.entityId());
        notificationObject.setEntity_type(data.notificationType());
        notificationObject.setAuthor(author);
        notificationObjectRepository.save(notificationObject);

        List<Notification> notifications = data.receivers().stream().map(
                receiver -> new Notification(receiver, notificationObject)
        ).toList();

        notificationRepository.saveAll(notifications);

        notifications.forEach(notification -> template.convertAndSendToUser(
                notification.getReceiver().getUsername(),
                "/notifications",
                new NotificationResource(notification)
        ));
    }

    public List<Notification> getNotificationForUser(User user) {
        return notificationRepository.findByReceiverOrderByCreatedAtDesc(user).orElse(new ArrayList<>());
    }

    public String generateNotificationMessage() {
        return "";
    }

    public Notification getNotification(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public void readNotifications(User user) {
        List<Notification> notifications = notificationRepository.findByReceiverAndHasRead(user, true).orElse(new ArrayList<>());

        notifications.forEach(notification -> {
            notification.setHasRead(true);
            notificationRepository.save(notification);
        });
    }

    public void hideNotification(User user, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(NotificationDoesNotExistException::new);
        if(!notification.getReceiver().getId().equals(user.getId())) {
            throw new NotificationDoesNotExistException("Cannot modify notification.");
        }

        if(notification.isHidden())
            return;

        notification.setHidden(true);
        notificationRepository.save(notification);
    }
}
