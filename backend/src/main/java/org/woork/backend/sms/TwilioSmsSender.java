package org.woork.backend.sms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

@Service
public class TwilioSmsSender {
    private final String ACCOUNT_SID = Dotenv.load().get("TWILIO_ACCOUNT_SID");
    private final String AUTH_TOKEN = Dotenv.load().get("TWILIO_AUTH_TOKEN");
    private final String TRIAL_NUMBER = Dotenv.load().get("TWILIO_TRIAL_NUMBER");

    public TwilioSmsSender() {
        Twilio.init(
                ACCOUNT_SID,
                AUTH_TOKEN
        );
    }

    public void sendSMS(String phoneNumber, String message) {
        MessageCreator msg = Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(TRIAL_NUMBER),
                message
        );
        msg.create();
    }

    public boolean PhoneNumberValid(String phone) {
        com.twilio.rest.lookups.v2.PhoneNumber phoneNumber = com.twilio.rest.lookups.v2.PhoneNumber.fetcher(phone).fetch();

        return phoneNumber.getValid();
    }
}
