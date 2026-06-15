package com.shamiso.jobtracker.job;

import com.shamiso.jobtracker.dto.JobApplicationRequest;
import com.shamiso.jobtracker.dto.JobApplicationResponse;
import com.shamiso.jobtracker.dto.JobStatsResponse;
import com.shamiso.jobtracker.exception.JobNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public List<JobApplicationResponse> getAllJobs() {
        return jobApplicationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public JobApplicationResponse getJobById(Integer id) {
        JobApplication job = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));

        return mapToResponse(job);
    }

    public JobApplicationResponse createJob(JobApplicationRequest request) {
        JobApplication job = new JobApplication();

        job.setCompanyName(request.getCompanyName());
        job.setRoleTitle(request.getRoleTitle());
        job.setLocation(request.getLocation());
        job.setApplicationDate(request.getApplicationDate());
        job.setStatus(JobStatus.valueOf(request.getStatus().toUpperCase()));
        job.setNotes(request.getNotes());

        JobApplication savedJob = jobApplicationRepository.save(job);

        return mapToResponse(savedJob);
    }

    public JobApplicationResponse updateJob(Integer id, JobApplicationRequest request) {

        JobApplication existingJob = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));

        existingJob.setCompanyName(request.getCompanyName());
        existingJob.setRoleTitle(request.getRoleTitle());
        existingJob.setLocation(request.getLocation());
        existingJob.setStatus(JobStatus.valueOf(request.getStatus().toUpperCase()));
        existingJob.setApplicationDate(request.getApplicationDate());
        existingJob.setNotes(request.getNotes());

        JobApplication updatedJob = jobApplicationRepository.save(existingJob);

        return mapToResponse(updatedJob);
    }

    public void deleteJob(Integer id) {

        if (!jobApplicationRepository.existsById(id)) {
            throw new JobNotFoundException(id);
        }

        jobApplicationRepository.deleteById(id);
    }

    public List<JobApplicationResponse> getJobsByStatus(JobStatus status) {
        return jobApplicationRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<JobApplicationResponse> searchJobsByCompany(String companyName) {
        return jobApplicationRepository.findByCompanyNameContainingIgnoreCase(companyName)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private JobApplicationResponse mapToResponse(JobApplication job) {
        return new JobApplicationResponse(
                job.getId(),
                job.getCompanyName(),
                job.getRoleTitle(),
                job.getLocation(),
                job.getApplicationDate(),
                job.getStatus().name(),
                job.getNotes()
        );
    }

    public JobStatsResponse getJobStats() {

        long totalApplications = jobApplicationRepository.count();

        long saved = jobApplicationRepository.findByStatus(JobStatus.SAVED).size();
        long applied = jobApplicationRepository.findByStatus(JobStatus.APPLIED).size();
        long interview = jobApplicationRepository.findByStatus(JobStatus.INTERVIEW).size();
        long offer = jobApplicationRepository.findByStatus(JobStatus.OFFER).size();
        long rejected = jobApplicationRepository.findByStatus(JobStatus.REJECTED).size();

        return new JobStatsResponse(
                totalApplications,
                saved,
                applied,
                interview,
                offer,
                rejected
        );
    }


}