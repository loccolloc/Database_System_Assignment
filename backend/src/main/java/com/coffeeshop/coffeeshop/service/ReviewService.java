package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {

    List<ReviewDTO> getAllReviews();

    ReviewDTO getReviewById(int userId, int productId);

    List<ReviewDTO> getReviewByUserId(int id);

    int postReview(ReviewDTO reviewDTO);

    int deleteReview(int userId, int productId);

    int putReview(ReviewDTO reviewDTO);

    List<ReviewDTO> getReviewByProductId(int id);
}
