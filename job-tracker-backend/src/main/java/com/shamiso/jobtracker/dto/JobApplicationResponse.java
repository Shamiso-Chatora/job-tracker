// dto/JobApplicationResponse.java
package com.shamiso.jobtracker.dto;

import java.time.LocalDate;

public class JobApplicationResponse {

    private Integer id;
    private String companyName;
    private String roleTitle;
    private String location;
    private LocalDate applicationDate;
    private String status;
    private String notes;

    public JobApplicationResponse(Integer id, String companyName, String roleTitle,
                                  String location, LocalDate applicationDate,
                                  String status, String notes) {
        this.id = id;
        this.companyName = companyName;
        this.roleTitle = roleTitle;
        this.location = location;
        this.applicationDate = applicationDate;
        this.status = status;
        this.notes = notes;
    }

    public Integer getId() { return id; }
    public String getCompanyName() { return companyName; }
    public String getRoleTitle() { return roleTitle; }
    public String getLocation() { return location; }
    public LocalDate getApplicationDate() { return applicationDate; }
    public String getStatus() { return status; }
    public String getNotes() { return notes; }
}