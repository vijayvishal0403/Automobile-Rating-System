package com.example.automobile_rating.exception;

public class DuplicateVehicleException extends RuntimeException {
    public DuplicateVehicleException(String brand, String model, String type) {
        super(String.format("A vehicle with brand '%s', model '%s', and type '%s' already exists", brand, model, type));
    }
} 