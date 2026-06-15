package com.shamiso.jobtracker.job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

    List<JobApplication> findByStatus(JobStatus status);

    List<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName);





}
