package com.waterbill.backend.dto;

import lombok.Data;

@Data
public class CashfreeLinkResponse {
    private String linkId;
    private String cfLinkId;
    private String linkUrl;
    private String status;
    private String expiresAt;
}
