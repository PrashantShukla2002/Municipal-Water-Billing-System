package com.waterbill.backend.controller;

import com.waterbill.backend.dto.CreatePayLinkRequest;
import com.waterbill.backend.entity.Bill;
import com.waterbill.backend.entity.PaymentLink;
import com.waterbill.backend.exception.BillNotFoundException;
import com.waterbill.backend.repository.BillRepository;
import com.waterbill.backend.repository.PaymentLinkRepository;
import com.waterbill.backend.service.CashfreeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/paylinks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PayLinkController {
    private final BillRepository billRepository;
    private final PaymentLinkRepository paymentLinkRepository;
    private final CashfreeService cashfreeService;

    @PostMapping
    public ResponseEntity<PaymentLink> createPayLink(@Valid @RequestBody CreatePayLinkRequest request) {
        Bill bill = billRepository.findByBillNumber(request.getBillNumber())
                .orElseThrow(() -> new BillNotFoundException("Bill not found"));
        if (!"link".equals(request.getChannel())) {
            return ResponseEntity.badRequest().build(); // Only link supported for now
        }
        String idempotencyKey = bill.getBillNumber() + "-" + LocalDate.now();
        PaymentLink cfResponse = CashfreeService.createPaymentLink(bill, idempotencyKey);


        // Optionally, save the PaymentLink in your database:
        paymentLinkRepository.save(cfResponse);

        return ResponseEntity.ok(cfResponse);
    }
}
