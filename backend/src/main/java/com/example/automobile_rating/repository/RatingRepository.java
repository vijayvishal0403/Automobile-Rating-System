package com.example.automobile_rating.repository;

import com.example.automobile_rating.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {}
