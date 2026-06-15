package com.shamiso.jobtracker.exception;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Integer id) {
        super("Job application with ID " + id + " not found.");
    }
    
}
