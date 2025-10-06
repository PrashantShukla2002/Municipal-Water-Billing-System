package com.waterbill.backend.controller;

import com.waterbill.backend.dto.FetchBillRequest;
import com.waterbill.backend.entity.Bill;
import com.waterbill.backend.enums.BillStatus;
import com.waterbill.backend.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.List;

@RequestMapping("/api/bills")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for frontend
public class BillController {

    private final BillService billService;

    @PostMapping("/fetch")
    public ResponseEntity<Bill> fetchBill(@Valid @RequestBody FetchBillRequest request) {
        System.out.println("[DEBUG] Fetching bill for: " + request.getBillNumber());
        Bill bill = billService.fetchAndUpsertBill(request.getBillNumber());
        System.out.println("[DEBUG] Fetched bill: " + bill);
        return ResponseEntity.ok(bill);
    }


    @GetMapping("/{billNumber}")
    public ResponseEntity<Bill> getBill(@PathVariable String billNumber) {
        return billService.findByBillNumber(billNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getBills(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate,
            @RequestParam(required = false) String search) {

        java.time.LocalDateTime from = fromDate != null ? java.time.LocalDateTime.parse(fromDate) : null;
        java.time.LocalDateTime to = toDate != null ? java.time.LocalDateTime.parse(toDate) : null;
        BillStatus billStatus = status != null ? BillStatus.valueOf(status.toUpperCase()) : null;

        List<Bill> bills = billService.findByFilters(billStatus, from, to, search);
        return ResponseEntity.ok(bills);
    }
}
