import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../services/apply/application.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
})
export class UpdateModalComponent {
  @Input() data: any; // Input data for the modal

  reason: string = ''; // Holds the updated "approved" value
  message: any;

  constructor(private modalService: NgbModal, private applicationService: ApplicationService, private toastr: ToastrService) {}

  open(content: any) {
    this.reason = this.data.approved;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateApproved() {
    // Update the "approved" field using this.approved and this.data.passportNumber
    // Call your applicationService.update method here
    // After the update, you can close the modal
    this.data.approved = this.reason;
    this.applicationService.update(this.data.passportNumber, this.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This application was updated successfully!';
          this.showNotification('top', 'center');
          this.modalService.dismissAll();
        },
        error: (e) => console.error(e)
      });
  }
  showNotification(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Application Diarised.</b></span>',
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
}
