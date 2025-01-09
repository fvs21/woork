package org.woork.backend.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.exceptions.NotificationDoesNotExistException;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.repositories.ChatRepository;
import org.woork.backend.notification.models.Notification;
import org.woork.backend.notification.models.NotificationObject;
import org.woork.backend.notification.models.NotificationType;
import org.woork.backend.notification.records.notifications.AcceptedPostingApplicationNotification;
import org.woork.backend.notification.records.notifications.NewMessageNotification;
import org.woork.backend.notification.records.NotificationData;
import org.woork.backend.notification.records.notifications.PostingApplicationNotification;
import org.woork.backend.notification.repositories.NotificationObjectRepository;
import org.woork.backend.notification.repositories.NotificationRepository;
import org.woork.backend.notification.resources.NotificationResource;
import org.woork.backend.pendingjob.PendingJob;
import org.woork.backend.pendingjob.PendingJobRepository;
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
    private final ChatRepository chatRepository;
    private final PendingJobRepository pendingJobRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, NotificationObjectRepository notificationObjectRepository, SimpMessagingTemplate template, PostingRepository postingRepository, UrlService urlService, ChatRepository chatRepository, PendingJobRepository pendingJobRepository) {
        this.notificationRepository = notificationRepository;
        this.notificationObjectRepository = notificationObjectRepository;
        this.template = template;
        this.postingRepository = postingRepository;
        this.urlService = urlService;
        this.chatRepository = chatRepository;
        this.pendingJobRepository = pendingJobRepository;
    }

    public NewMessageNotification generateNewMessageNotification(User author, Chat chat) {
        return new NewMessageNotification(
              author.getFullName(),
              "/profile/show/" + author.getUsername(),
              chat.getId()
        );
    }

    public PostingApplicationNotification generatePostingApplicationPayload(User author, Posting posting) {
        return new PostingApplicationNotification(
                author.getFullName(),
                "/profile/show/" + author.getUsername(),
                posting.getTitle(),
                "/posting/" + urlService.encodeIdToUrl(posting.getId())
        );
    }

    public AcceptedPostingApplicationNotification generateAcceptedPostingApplicationPayload(User author, PendingJob pendingJob) {
        return new AcceptedPostingApplicationNotification(
                author.getFullName(),
                "/profile/show/" + author.getUsername(),
                pendingJob.getPosting().getTitle(),
                "/posting/" + urlService.encodeIdToUrl(pendingJob.getPosting().getId()),
                pendingJob.getId()
        );
    }

    public Object determineAndGenerateNotificationPayload(NotificationType type, User author, Object entity) {
        switch (type) {
            case JOB_APPLICATION -> {
                return generatePostingApplicationPayload(author, (Posting) entity);
            }
            case NEW_MESSAGE -> {
                return generateNewMessageNotification(author, (Chat) entity);
            }
            case ACCEPTED_APPLICATION -> {
                return generateAcceptedPostingApplicationPayload(author, (PendingJob) entity);
            }
        }

        return null;
    }

    public void createAndSendNotification(User author, NotificationData data) {
        List<Notification> notifications = createNotifications(author, data);

        Object payload = determineAndGenerateNotificationPayload(data.notificationType(), author, data.entity());

        notifications.forEach(notification -> template.convertAndSendToUser(
                notification.getReceiver().getUsername(),
                "/queue/notifications",
                new NotificationResource(notification, payload)
        ));
    }

    public List<Notification> createNotifications(User author, NotificationData data) {
        NotificationObject notificationObject = new NotificationObject();
        notificationObject.setEntity_id(data.entityId());
        notificationObject.setEntity_type(data.notificationType());
        notificationObject.setAuthor(author);
        notificationObjectRepository.save(notificationObject);

        List<Notification> notifications = data.receivers().stream().map(
                receiver -> new Notification(receiver, notificationObject)
        ).toList();

        notificationRepository.saveAll(notifications);

        return notifications;
    }

    public List<NotificationResource> getNotificationForUser(User user) {
        List<Notification> notifications = notificationRepository.findAllByReceiverOrderByCreatedAtDesc(user).orElse(new ArrayList<>());

        return notifications.stream().map(
                notification -> {
                    NotificationObject notificationObject = notification.getNotificationObject();
                    Object entity = getNotificationEntityObject(notificationObject.getEntity_type(), notificationObject.getEntity_id());
                    Object payload = determineAndGenerateNotificationPayload(notificationObject.getEntity_type(), notificationObject.getAuthor(), entity);
                    return new NotificationResource(notification, payload);
                }
        ).toList();
    }

    private Object getNotificationEntityObject(NotificationType type, Long entityId) {
        switch (type) {
            case JOB_APPLICATION -> {
                return postingRepository.findPostingById(entityId).orElse(null);
            }
            case NEW_MESSAGE -> {
                return chatRepository.findById(entityId).orElse(null);
            }
            case ACCEPTED_APPLICATION -> {
                return pendingJobRepository.findById(entityId).orElse(null);
            }
        }

        return null;
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
