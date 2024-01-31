import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/apply/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit {
  data: any;
  isLoading = false;
  //message = '';
  passportNumber = '';
  applications: any;
  applicantHistory: any;
  rejected: string = 'No';
  appApproved: string = 'Yes';

  constructor(private router: Router,private toastr: ToastrService, private applicationService: ApplicationService) {
     // Access the selected row's data from the router's navigation state
     const navigation = window.history.state;
     if (navigation && navigation.data) {
       this.data = navigation.data;
       this.passportNumber = this.data.passportNumber;
     }
   }

  ngOnInit(): void {
    this.retrieveApplication();
  }

  retrieveApplication(): void {
    this.isLoading = true;
    this.applicationService.findByPassportNumber(this.passportNumber)
      .subscribe(
        data => {
          this.applicantHistory = data;
          console.log(data);
          this.isLoading = false;
        },
        error => {
          console.log(error);
        });
  }

  searchInstitution(): void {
    this.applicationService.findByPassportNumber(this.passportNumber)
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
          if(this.applications == ""){
            this.showNotification('bottom', 'center');
          }
        },
        error => {
          console.log(error);
        });
  }

  showNotification(from, align) {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span><b>Student Not Found</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }

  approveApplication() {
    this.data.approved = this.appApproved;
    this.applicationService.update(this.data.passportNumber, this.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.showNotification2('top', 'center');
         // Redirect to another page or perform other actions
         this.router.navigate(['/dashboard']);
        },
        error: (e) => console.error(e)
      });
  }
  showNotification2(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span><b>Application Approved.</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }

  rejectApplication() {
    this.data.approved = this.rejected;
    this.applicationService.update(this.data.passportNumber, this.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.message = res.message ? res.message : 'This application was updated successfully!';
          this.showNotification3('top', 'center');
         // Redirect to another page or perform other actions
         this.router.navigate(['/dashboard']);
        },
        error: (e) => console.error(e)
      });
  }
  showNotification3(from, align) {
    this.toastr.warning(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span><b>Application Rejected.</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }

}
