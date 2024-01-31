import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services/apply/application.service';
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    passportNumber = '';
  applications: any;

    constructor(private toastr: ToastrService, private applicationService: ApplicationService) {
    }
    ngOnInit(){
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
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Student Not Found</b></span>',
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
