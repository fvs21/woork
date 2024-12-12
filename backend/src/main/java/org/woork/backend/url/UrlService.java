package org.woork.backend.url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sqids.Sqids;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.url.records.DecimalAsInteger;

import java.util.List;

@Service
public class UrlService {
    private final Sqids sqids;

    @Autowired
    public UrlService(Sqids sqids) {
        this.sqids = sqids;
    }

    public String encodeIdToUrl(Long id) {
        return sqids.encode(List.of(id));
    }

    public List<Long> decodeIdFromUrl(String encodedUrl) {
        return sqids.decode(encodedUrl);
    }

    public String encodeCoordinates(LocationQuery query) {
        DecimalAsInteger convertedLat = convertDecimalToInt(query.latitude());
        DecimalAsInteger convertedLong = convertDecimalToInt(query.longitude());

        return sqids.encode(
                List.of(
                        convertedLat.decimal(),
                        convertedLat.numberOfDecimalPlaces(),
                        query.latitude() > 0 ? 0L : 1L,
                        convertedLong.decimal(),
                        convertedLong.numberOfDecimalPlaces(),
                        query.longitude() > 0 ? 0L : 1L,
                        query.radius()
                )
        );
    }

    public DecimalAsInteger convertDecimalToInt(Double decimal) {
        long numOfDecimals = Long.parseLong(
                new StringBuilder(
                        String.valueOf(decimal)
                ).reverse().toString()
        );
        return new DecimalAsInteger(
                (long) (decimal + Math.pow(10, numOfDecimals)),
                numOfDecimals
        );
    }

    public Double convertIntToDecimal(int number, int numOfDecimals) {
        return number / Math.pow(10, numOfDecimals);
    }

    public LocationQuery decodeCoordinates(String url) {
        List<Long> coordinates = sqids.decode(url);

        Double lat = convertIntToDecimal(
                Math.toIntExact(coordinates.get(0)),
                Math.toIntExact(coordinates.get(1))
        );

        Double lng = convertIntToDecimal(
                Math.toIntExact(coordinates.get(3)),
                Math.toIntExact(coordinates.get(4))
        );

        Long radius = coordinates.get(6);

        return new LocationQuery(
                lat, lng, radius
        );
    }
}
