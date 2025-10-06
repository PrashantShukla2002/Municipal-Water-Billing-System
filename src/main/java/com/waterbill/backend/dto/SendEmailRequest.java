package com.waterbill.backend.dto;
import lombok.Data;
@Data
public class SendEmailRequest {
    private String billNumber;
    private String toEmail;
}
