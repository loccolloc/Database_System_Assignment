package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Reviews;
import com.coffeeshop.coffeeshop.entity.keys.IdReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Reviews, IdReviews> {
    List<Reviews> findByCustomerId(int id);

    List<Reviews> findByProductId(int id);
}
