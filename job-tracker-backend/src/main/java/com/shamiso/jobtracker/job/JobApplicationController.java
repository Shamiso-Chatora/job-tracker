package com.shamiso.jobtracker.job;

import com.shamiso.jobtracker.dto.JobApplicationRequest;
import com.shamiso.jobtracker.dto.JobApplicationResponse;
import com.shamiso.jobtracker.dto.JobStatsResponse;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/jobs")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping
    public List<JobApplicationResponse> getAllJobs() {
        return jobApplicationService.getAllJobs();
    }
   

    @GetMapping("/{id}")
    public JobApplicationResponse getJobById(@PathVariable Integer id) {
        return jobApplicationService.getJobById(id);
    }

    @PostMapping
    public ResponseEntity<JobApplicationResponse> createJob(
            @Valid @RequestBody JobApplicationRequest request) {

        JobApplicationResponse createdJob = jobApplicationService.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    public JobApplicationResponse updateJob(
            @PathVariable Integer id,
            @Valid @RequestBody JobApplicationRequest request) {

        return jobApplicationService.updateJob(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer id) {
        jobApplicationService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/status")
    public List<JobApplicationResponse> getJobsByStatus(@RequestParam JobStatus status) {
        return jobApplicationService.getJobsByStatus(status);
    }

    @GetMapping("/search/company")
    public List<JobApplicationResponse> searchJobsByCompany(
            @RequestParam String companyName) {

        return jobApplicationService.searchJobsByCompany(companyName);
    }

    @GetMapping("/stats")
    public JobStatsResponse getJobStats() {
        return jobApplicationService.getJobStats();
    }

    

}