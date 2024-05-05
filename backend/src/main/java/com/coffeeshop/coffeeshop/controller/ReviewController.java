package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.ReviewDTO;
import com.coffeeshop.coffeeshop.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @GetMapping("/all")
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/get")
    public ReviewDTO getReviewById(@RequestParam int user_id, @RequestParam int product_id) {
        return reviewService.getReviewById(user_id, product_id);
    }

    @GetMapping("/getByUserId/{id}")
    public List<ReviewDTO> getReviewByUserId(@PathVariable int id) {
        return reviewService.getReviewByUserId(id);
    }

    @GetMapping("/getByProductId/{id}")
    public List<ReviewDTO> getReviewByProductId(@PathVariable int id) {
        return reviewService.getReviewByProductId(id);
    }

    @PostMapping("/post")
    public int postReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.postReview(reviewDTO);
    }

    @DeleteMapping("/delete")
    public int deleteReview(@RequestParam int user_id, @RequestParam int product_id) {
        return reviewService.deleteReview(user_id, product_id);
    }

    @PutMapping("/put")
    public int putReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.putReview(reviewDTO);
    }
}
