package com.waterbill.backend.entity;

import com.waterbill.backend.enums.BillStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Data // Lombok generates getters and setters automatically
@NoArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "bill_number", unique = true)
    private String billNumber;

    @Column(name = "consumer_name")
    private String consumerName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone; // <-- Add phone field if missing

    @Column(name = "address")
    private String address;

    @Column(name = "service_period_start")
    private LocalDate servicePeriodStart;

    @Column(name = "service_period_end")
    private LocalDate servicePeriodEnd;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "base_amount")
    private Double baseAmount;

    @Column(name = "penalty_amount")
    private Double penaltyAmount;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BillStatus status = BillStatus.UNPAID;

    @Column(name = "bank_ref")
    private String bankRef;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // These methods help in service integration
    public String getConsumerEmail() {
        return email;
    }
    public String getConsumerPhone() {
        return phone;
    }
    public double getTotalAmount() {
        return totalAmount != null ? totalAmount : 0.0;
    }
}
