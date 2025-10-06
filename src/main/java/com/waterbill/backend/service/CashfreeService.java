package com.waterbill.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waterbill.backend.entity.Bill;
import com.waterbill.backend.entity.PaymentLink;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class CashfreeService {

    // TODO: Move to application.properties for production security
    private static final String APP_ID = "TEST1019028784bdefbf0b439352154e78209101";
    private static final String SECRET_KEY = "cfsk_ma_test_8451ea622c1ae52bad52ad23e652aa48_a9e5730c";
    private static final String API_URL = "https://test.cashfree.com/api/v2/order/create";  // Switch to production URL in prod

    public static PaymentLink createPaymentLink(Bill bill, String idempotencyKey) {
        try {
            // Extract required fields from Bill entity
            String orderId = bill.getBillNumber();  // e.g., "WB001"
            double amount = bill.getTotalAmount();  // e.g., 1500.00
            String customerEmail = bill.getConsumerEmail();  // Adjust getter if needed (e.g., getEmail())
            String customerPhone = bill.getConsumerPhone();  // Adjust getter if needed (e.g., getPhone())

            // Validate required fields
            if (orderId == null || customerEmail == null || customerPhone == null) {
                throw new IllegalArgumentException("Bill must have valid billNumber, consumerEmail, and consumerPhone");
            }

            // Prepare request payload as per Cashfree API docs
            Map<String, Object> payload = new HashMap<>();
            payload.put("appId", APP_ID);
            payload.put("orderId", orderId);
            payload.put("orderAmount", String.format("%.2f", amount));
            payload.put("orderCurrency", "INR");
            payload.put("orderNote", "Water Bill Payment - " + orderId);
            payload.put("customerEmail", customerEmail);
            payload.put("customerPhone", customerPhone);
            payload.put("returnUrl", "http://localhost:3000/thank-you?bill=" + orderId);  // Frontend success page with bill param
            payload.put("notifyUrl", "http://localhost:8080/api/payments/callback");  // Backend webhook URL for status updates

            // Generate signature (before adding it to payload)
            String signature = generateSignature(payload);
            payload.put("signature", signature);

            // Call Cashfree API
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();
                if (body != null && "OK".equals(body.get("status"))) {
                    String paymentLinkUrl = (String) body.get("paymentLink");

                    // Create and populate PaymentLink entity
                    PaymentLink paymentLink = new PaymentLink();
                    paymentLink.setBill(String.valueOf(bill));
                    paymentLink.setBill(paymentLinkUrl);
                    paymentLink.setIdempotencyKey(idempotencyKey);
                    paymentLink.setCreatedAt(new Date());

                    // Optional: Save to database here if needed (inject repository)
                    return paymentLink;
                } else {
                    throw new RuntimeException("Cashfree API error: " + (body != null ? body.get("message") : "Unknown error"));
                }
            } else {
                throw new RuntimeException("Failed to create payment link. HTTP Status: " + response.getStatusCode() +
                        ", Body: " + response.getBody());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error creating Cashfree payment link: " + e.getMessage(), e);
        }
    }

    private static String generateSignature(Map<String, Object> data) throws NoSuchAlgorithmException, InvalidKeyException {
        // Build signature string as per Cashfree docs: specific fields concatenated in exact order (no spaces)
        String signatureString = APP_ID +
                data.get("orderId") +
                data.get("orderAmount") +
                data.get("orderCurrency") +
                data.get("customerEmail") +
                data.get("customerPhone") +
                data.get("returnUrl") +
                data.get("notifyUrl");

        try {
            // HMAC SHA256 with secret key
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes("UTF-8"), "HmacSHA256");
            sha256Hmac.init(secretKey);

            // Compute hash
            byte[] hash = sha256Hmac.doFinal(signatureString.getBytes("UTF-8"));

            // Convert to lowercase hex string
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString().toLowerCase();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate signature: " + e.getMessage(), e);
        }
    }
}