package com.spencer.surfhq.repository;

import com.spencer.surfhq.model.SurfSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurfSpotRepository extends JpaRepository<SurfSpot, Long> {
}
