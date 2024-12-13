package org.woork.backend.postingapplication;

public enum Status {
    REQUESTED,
    REJECTED,
    ACCEPTED;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
