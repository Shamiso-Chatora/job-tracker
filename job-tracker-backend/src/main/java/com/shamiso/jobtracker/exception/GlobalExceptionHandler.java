package com.shamiso.jobtracker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.shamiso.jobtracker.job.JobStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import java.util.Arrays;
import java.util.Map;
import org.springframework.web.bind.MethodArgumentNotValidException;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(JobNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleJobNotFound(JobNotFoundException ex) {
        return Map.of("message", ex.getMessage());
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleInvalidEnum(HttpMessageNotReadableException ex) {
        return Map.of(
                "message", "Invalid request body. Check that status is one of: " +
                        Arrays.toString(JobStatus.values())
        );
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return errors;
    }
    
}