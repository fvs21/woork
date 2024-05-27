package org.woork.backend.posting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostingService {
    private final PostingRepository postingRepository;

    @Autowired
    public PostingService(PostingRepository postingRepository) {
        this.postingRepository = postingRepository;
    }
}
