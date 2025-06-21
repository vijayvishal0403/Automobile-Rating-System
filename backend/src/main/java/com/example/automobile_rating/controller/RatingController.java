package com.example.automobile_rating.controller;

import com.example.automobile_rating.model.Rating;
import com.example.automobile_rating.model.Vehicle;
import com.example.automobile_rating.repository.RatingRepository;
import com.example.automobile_rating.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @PostMapping("/{vehicleId}")
    public Rating addRating(@PathVariable Long vehicleId, @RequestBody Rating rating) {
        System.out.println("Received rating: " + rating.getComfort() + ", " + rating.getPerformance());
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow();
        double avg = (rating.getComfort() + rating.getPerformance() + rating.getDesign() + rating.getValueForMoney()) / 4.0;
        rating.setAverage(avg);
        rating.setVehicle(vehicle);
        return ratingRepository.save(rating);
    }
}
