package com.waterbill.backend.exception;
public class BillAlreadyPaidException extends RuntimeException {
    public BillAlreadyPaidException(String message) {
        super(message);
    }
}
