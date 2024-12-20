package org.woork.backend.url;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sqids.Sqids;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.url.records.DecimalAsInteger;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UrlService {
    private static final Log log = LogFactory.getLog(UrlService.class);
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
        long numOfDecimals = BigDecimal.valueOf(decimal).scale();
        return new DecimalAsInteger(
                Math.abs((long) (decimal * Math.pow(10, numOfDecimals))),
                numOfDecimals
        );
    }

    public Double convertIntToDecimal(long number, long numOfDecimals) {
        return number / Math.pow(10, numOfDecimals);
    }

    public LocationQuery decodeCoordinates(String url) {
        List<Long> coordinates = decodeIdFromUrl(url);
        log.info(coordinates);

        Double lat = convertIntToDecimal(
                coordinates.get(0),
                coordinates.get(1)
        ) * (coordinates.get(2) == 1 ? -1 : 1);

        Double lng = convertIntToDecimal(
                coordinates.get(3),
                coordinates.get(4)
        ) * (coordinates.get(5) == 1 ? -1 : 1);

        Long radius = coordinates.get(6);

        return new LocationQuery(
                lat, lng, radius
        );
    }
}
