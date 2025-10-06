package com.waterbill.backend.dto;

import lombok.Data;

@Data
public class CreatePayLinkRequest {
    private String billNumber;
    private String channel; // "link" or "checkout"
}
