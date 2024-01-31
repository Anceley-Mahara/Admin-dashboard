import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services/apply/application.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  applications: any[] = [];  // Initialize applications as an empty array
  currentApplication = null;
  currentIndex = -1;
  institution = '';

  isLoading = false;

  constructor(private applicationService: ApplicationService, private router: Router) { }

    ngOnInit(){
      this.retrieveApplications();
      this.getNewApplicantCount();
      this.getInstitutionVerificationCount();
      this. getPendingCount();
      this.getApprovedCount();

}

retrieveApplications(): void {
  this.isLoading = true;
  this.applicationService.getAll()
    .subscribe(
      data => {
        this.applications = data;
        console.log(data);
        this.isLoading = false;
      },
      error => {
        console.log(error);
      });
}
  // Function to count items with status 'New Applicant'
  getNewApplicantCount(): number {
    return this.applications.filter(item => item.status === 'New Applicant').length;
  }

  // Function to count items with status 'Institution Verification'
  getInstitutionVerificationCount(): number {
    return this.applications.filter(item => item.status === 'Institution Verification').length;
  }

   // Function to count items with status 'Resubmit'
   getPendingCount(): number {
    return this.applications.filter(item => item.status === 'Resubmit').length;
  }

   // Function to count items with status 'approved'
   getApprovedCount(): number {
    return this.applications.filter(item => item.approved === 'Yes').length;
  }

  viewApplication(applicationId: number) {
    // Navigate to the application detail page with the application ID as a parameter
    this.router.navigate(['/applications', applicationId]);
  }

refreshList(): void {
  this.retrieveApplications();
  this.currentApplication = null;
  this.currentIndex = -1;
}

setActiveApplication(application, index): void {
  this.currentApplication = application;
  this.currentIndex = index;
}

removeAllApplications(): void {
  this.applicationService.deleteAll()
    .subscribe(
      response => {
        console.log(response);
        this.retrieveApplications();
      },
      error => {
        console.log(error);
      });
}

}
