import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services/apply/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'institution-confirmation',
  templateUrl: './institution-confirmation.component.html',
  styleUrls: ['./institution-confirmation.component.css']
})
export class InstitutionConfirmationComponent implements OnInit {
  applications: any;
  currentApplication = null;
  currentIndex = -1;
  passportNumber = '';
  showTooltip = false; // Initialize to hide tooltip
  isLoading = false;

  constructor(private applicationService: ApplicationService, private router: Router) { }

  ngOnInit(): void {
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

  viewDetails(item: any) {
    if (!this.isFrontOfficeUser()) {
    // Navigate to the DetailComponent with the selected row's data
    this.router.navigate(['/institution-detail'], { state: { data: item } });
    }
  }

  searchInstitution(): void {
    this.applicationService.findByPassportNumber(this.passportNumber)
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // Replace this with your actual logic to check the user's access role
  isFrontOfficeUser(): boolean {
    // Simulate checking the user's role (replace this with your actual logic)
    const userRole = localStorage.getItem("role");
    if(userRole==="frontoffice"){
    return userRole === 'frontoffice';
  }
  }
}
