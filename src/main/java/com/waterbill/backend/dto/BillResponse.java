package com.waterbill.backend.dto;

import com.waterbill.backend.entity.PaymentLink;
import lombok.Data;

@Data
public class BillResponse {
    private BillDto bill;
    private PaymentLink latestPaymentLink;

    @Data
    public static class BillDto {
        private Long id;
        private String billNumber;
        private String consumerName;
        private String email;
        private String address;
        private String servicePeriodStart;
        private String servicePeriodEnd;
        private String dueDate;
        private Double baseAmount;
        private Double penaltyAmount;
        private Double totalAmount;
        private String status;
        private String bankRef;
        private String createdAt;
        private String updatedAt;
    }
}
