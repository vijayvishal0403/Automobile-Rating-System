package com.example.automobile_rating.repository;

import com.example.automobile_rating.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByType(String type);
    List<Vehicle> findByBrand(String brand);
    List<Vehicle> findByYear(int year);

    boolean existsByBrandAndModelAndType(String brand, String model, String type);

    @Query("SELECT v FROM Vehicle v JOIN v.ratings r GROUP BY v.id ORDER BY AVG(r.average) DESC")
    List<Vehicle> findByHighestAverageRating();

    @Query("SELECT v FROM Vehicle v ORDER BY v.year DESC")
    List<Vehicle> findByNewest();

    @Query("SELECT v FROM Vehicle v ORDER BY size(v.ratings) DESC")
    List<Vehicle> findByMostRated();
}
