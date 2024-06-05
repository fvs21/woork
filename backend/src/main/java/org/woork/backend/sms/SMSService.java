package org.woork.backend.sms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SMSService {
    private final TwilioSmsSender twilioSmsSender;

    @Autowired
    public SMSService(TwilioSmsSender twilioSmsSender) {
        this.twilioSmsSender = twilioSmsSender;
    }

    public void sendSMS(String phoneNumber, String message) {
        twilioSmsSender.sendSMS(phoneNumber, message);
    }

    public boolean checkPhoneValidity(String phoneNumber) {
        return twilioSmsSender.PhoneNumberValid(phoneNumber);
    }
}
