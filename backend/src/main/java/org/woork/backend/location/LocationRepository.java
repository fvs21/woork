package org.woork.backend.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findById(Long id);
    List<Location> findAllByCountryAndState(String country, String state);
    //List<Location> findAllByCountryAndStateAnd

    @Query("SELECT loc FROM Location loc WHERE (loc.country = :country AND loc.state = :state AND loc.city = :city)")
    List<Location> findAllByCountryAndStateAndCity(String country, String state, String city);
}
