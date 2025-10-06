package com.waterbill.backend.service;

import com.waterbill.backend.dto.MockBill;
import com.waterbill.backend.entity.Bill;
import com.waterbill.backend.enums.BillStatus;
import com.waterbill.backend.exception.BillNotFoundException;
import com.waterbill.backend.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill saveMockBill(Bill bill, MockBill mockBill) {
        bill.setConsumerName(mockBill.getConsumerName());
        bill.setEmail(mockBill.getEmail());
        bill.setAddress(mockBill.getAddress());
        bill.setServicePeriodStart(mockBill.getServicePeriodStart());
        bill.setServicePeriodEnd(mockBill.getServicePeriodEnd());
        bill.setDueDate(mockBill.getDueDate());
        bill.setBaseAmount(mockBill.getBaseAmount());
        bill.setPenaltyAmount(mockBill.getPenaltyAmount());
        bill.setTotalAmount(mockBill.getTotalAmount());
        bill.setStatus(BillStatus.valueOf(mockBill.getStatus()));
        bill.setBankRef(mockBill.getBankRef());
        return billRepository.save(bill);
    }

    public Optional<Bill> findByBillNumber(String billNumber) {
        return billRepository.findByBillNumber(billNumber);
    }

    public List<Bill> findByFilters(BillStatus status, LocalDateTime fromDate, LocalDateTime toDate, String search) {
        return billRepository.findByFilters(
                status,
                fromDate == null ? null : fromDate.toLocalDate(),
                toDate == null ? null : toDate.toLocalDate(),
                search
        );
    }

    public Bill updateStatus(String billNumber, BillStatus newStatus) {
        Optional<Bill> billOpt = findByBillNumber(billNumber);
        if (billOpt.isEmpty()) {
            throw new BillNotFoundException("Bill not found");
        }
        Bill bill = billOpt.get();
        bill.setStatus(newStatus);
        return billRepository.save(bill);
    }

    // ===== FULLY UPDATED MOCK/UPSERT METHOD ====
    public Bill fetchAndUpsertBill(String billNumber) {
        Optional<Bill> billOpt = findByBillNumber(billNumber);
        if (billOpt.isPresent()) {
            System.out.println("[DEBUG] Fetched bill: " + billOpt.get());
            return billOpt.get();
        }
        Bill newBill = new Bill();
        newBill.setBillNumber("20204040");

        // Set full default/mock values as needed:
        newBill.setConsumerName("Prashant");
        newBill.setEmail("prashant2021@email.com");
        newBill.setAddress("123 Ayodhya, Ayodhya");
        newBill.setServicePeriodStart(LocalDate.now().withDayOfMonth(1));
        newBill.setServicePeriodEnd(LocalDate.now());
        newBill.setDueDate(LocalDate.now().plusDays(7));
        newBill.setBaseAmount(800.0);
        newBill.setPenaltyAmount(100.0);
        newBill.setTotalAmount(900.0);
        newBill.setStatus(BillStatus.UNPAID);
        newBill.setBankRef("BANKREF15425523");
        newBill.setCreatedAt(LocalDateTime.now());
        newBill.setUpdatedAt(LocalDateTime.now());

        System.out.println("[DEBUG] Creating mock bill: " + newBill);
        return billRepository.save(newBill);
    }
}
