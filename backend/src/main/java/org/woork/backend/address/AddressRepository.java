package org.woork.backend.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.woork.backend.posting.Posting;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findById(Long id);
    List<Address> findAllByCountryAndState(String country, String state);
    //List<Location> findAllByCountryAndStateAnd

    Set<Address> findAllByLatitudeBetweenAndLongitudeBetween(Double latitude, Double latitude2, Double longitude, Double longitude2);
}
