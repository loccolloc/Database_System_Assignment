package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.ReviewDTO;
import com.coffeeshop.coffeeshop.entity.Reviews;
import com.coffeeshop.coffeeshop.entity.keys.IdReviews;
import com.coffeeshop.coffeeshop.mapper.DTOMapper;
import com.coffeeshop.coffeeshop.repository.ReviewRepository;
import com.coffeeshop.coffeeshop.service.ReviewService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImp implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    DTOMapper dtoMapper;

    @Override
    public List<ReviewDTO> getAllReviews() {
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        reviewRepository.findAll().forEach(review -> reviewDTOList.add(dtoMapper.toReviewDTO(review)));
        return reviewDTOList;
    }

    @Override
    public ReviewDTO getReviewById(int userId, int productId) {
        return reviewRepository.findById(new IdReviews(userId, productId))
                .map(dtoMapper::toReviewDTO).orElse(null);
    }

    @Override
    public List<ReviewDTO> getReviewByUserId(int id) {
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        reviewRepository.findByCustomerId(id).forEach(review -> reviewDTOList.add(dtoMapper.toReviewDTO(review)));
        return reviewDTOList;
    }

    @Override
    public List<ReviewDTO> getReviewByProductId(int id) {
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        reviewRepository.findByProductId(id).forEach(review -> reviewDTOList.add(dtoMapper.toReviewDTO(review)));
        return reviewDTOList;
    }

    @Override
    public int postReview(ReviewDTO reviewDTO) {
        try {
            Reviews review = dtoMapper.toReviewEntity(reviewDTO);
            reviewRepository.save(review);
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public int deleteReview(int userId, int productId) {
        try {
            if (reviewRepository.findById(new IdReviews(userId, productId)).isEmpty()) {
                return -1;
            }
            reviewRepository.deleteById(new IdReviews(userId, productId));
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    @Transactional
    public int putReview(ReviewDTO reviewDTO) {
        Reviews review = reviewRepository.findById(new IdReviews(reviewDTO.getCustomer_id(), reviewDTO.getProduct_id()))
                .orElse(null);
        if (review == null) {
            return -1;
        } else {
            review.setComment(reviewDTO.getComment());
            review.setScore(reviewDTO.getScore());
            return 0;
        }
    }
}
