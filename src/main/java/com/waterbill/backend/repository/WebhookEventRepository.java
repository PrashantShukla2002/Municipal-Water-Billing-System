package com.waterbill.backend.repository;
import com.waterbill.backend.entity.WebhookEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface WebhookEventRepository extends JpaRepository<WebhookEvent, Long> {
}
