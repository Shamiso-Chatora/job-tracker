package com.shamiso.jobtracker.dto;

public class JobStatsResponse {

    private long totalApplications;
    private long applied;
    private long interview;
    private long offer;
    private long rejected;
    private long saved;

    public JobStatsResponse(long totalApplications,
                        long saved,
                        long applied,
                        long interview,
                        long offer,
                        long rejected) {

        this.totalApplications = totalApplications;
        this.saved = saved;
        this.applied = applied;
        this.interview = interview;
        this.offer = offer;
        this.rejected = rejected;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public long getSaved() {
        return saved;
    }

    public long getApplied() {
        return applied;
    }

    public long getInterview() {
        return interview;
    }

    public long getOffer() {
        return offer;
    }

    public long getRejected() {
        return rejected;
    }
}