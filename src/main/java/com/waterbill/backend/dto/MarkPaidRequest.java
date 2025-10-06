package com.waterbill.backend.dto;

import lombok.Data;

@Data
public class MarkPaidRequest {
    private String paymentRef;
    private Double paidAmount;
    private String paidAt;
}
