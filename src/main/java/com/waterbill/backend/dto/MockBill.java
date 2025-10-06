package com.waterbill.backend.dto; // or the package you prefer

import lombok.Data;
import java.time.LocalDate;

@Data
public class MockBill {
    private String consumerName;
    private String email;
    private String address;
    private LocalDate servicePeriodStart;
    private LocalDate servicePeriodEnd;
    private LocalDate dueDate;
    private Double baseAmount;
    private Double penaltyAmount;
    private Double totalAmount;
    private String status;
    private String bankRef;
}
