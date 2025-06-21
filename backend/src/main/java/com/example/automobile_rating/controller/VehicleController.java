package com.example.automobile_rating.controller;

import com.example.automobile_rating.exception.DuplicateVehicleException;
import com.example.automobile_rating.model.Vehicle;
import com.example.automobile_rating.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @GetMapping
    public List<Vehicle> getAll() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/filter")
    public List<Vehicle> filter(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer year
    ) {
        if (type != null) return vehicleRepository.findByType(type);
        if (brand != null) return vehicleRepository.findByBrand(brand);
        if (year != null) return vehicleRepository.findByYear(year);
        return vehicleRepository.findAll();
    }

    @GetMapping("/sort")
    public List<Vehicle> sort(@RequestParam String by) {
        return switch (by) {
            case "highest" -> vehicleRepository.findByHighestAverageRating();
            case "newest" -> vehicleRepository.findByNewest();
            case "mostRated" -> vehicleRepository.findByMostRated();
            default -> vehicleRepository.findAll();
        };
    }

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        // Check if a vehicle with the same brand, model, and type already exists
        if (vehicleRepository.existsByBrandAndModelAndType(
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getType())) {
            throw new DuplicateVehicleException(
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getType()
            );
        }
        return vehicleRepository.save(vehicle);
    }

    @PutMapping("/{id}")
    public Vehicle update(@PathVariable Long id, @RequestBody Vehicle updated) {
        Vehicle v = vehicleRepository.findById(id).orElseThrow();
        v.setType(updated.getType());
        v.setBrand(updated.getBrand());
        v.setModel(updated.getModel());
        v.setYear(updated.getYear());
        return vehicleRepository.save(v);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vehicleRepository.deleteById(id);
    }
}
