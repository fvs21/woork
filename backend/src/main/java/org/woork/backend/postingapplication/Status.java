package org.woork.backend.postingapplication;

public enum Status {
    REQUESTED,
    REJECTED,
    ACCEPTED;

    private String name;

    @Override
    public String toString() {
        return name.toLowerCase();
    }
}
