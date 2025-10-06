package com.waterbill.backend.repository;

import com.waterbill.backend.entity.Bill;
import com.waterbill.backend.enums.BillStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Optional<Bill> findByBillNumber(String billNumber);

    List<Bill> findByStatus(BillStatus status);

    @Query("SELECT b FROM Bill b WHERE " +
            "(:status IS NULL OR b.status = :status) AND " +
            "(:fromDate IS NULL OR b.servicePeriodStart >= :fromDate) AND " +
            "(:toDate IS NULL OR b.servicePeriodEnd <= :toDate) AND " +
            "(:search IS NULL OR LOWER(b.billNumber) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(b.consumerName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Bill> findByFilters(@Param("status") BillStatus status,
                             @Param("fromDate") LocalDate fromDate,
                             @Param("toDate") LocalDate toDate,
                             @Param("search") String search);

}
