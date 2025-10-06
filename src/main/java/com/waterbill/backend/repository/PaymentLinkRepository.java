package com.waterbill.backend.repository;

import com.waterbill.backend.entity.PaymentLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PaymentLinkRepository extends JpaRepository<PaymentLink, Long> {
    @Query("SELECT pl FROM PaymentLink pl WHERE pl.cfLinkId = :cfLinkId")
    Optional<PaymentLink> findByCfLinkId(@Param("cfLinkId") String cfLinkId);
}

