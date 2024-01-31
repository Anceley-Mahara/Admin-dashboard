import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/apply/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { saveAs } from 'file-saver';  // Import file-saver for file download


@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  application: any = {};
  isLoading = false;
  reason: string = '';
  status: string = '';



  constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private router: Router,private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.getApplicationDetails();
  }

  getApplicationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Assuming you're using route params
    this.applicationService.getApplication(id).subscribe(
      data => {
        this.application = data;
      },
      error => console.error(error)
    );
  }

  getAttachmentUrl(filePath: string): string {
    return `http://localhost:3000/uploads/${filePath}`;
  }

  updateApplication(): void{
    this.isLoading = true;
    this.application.status = 'Institution Verification';
    this.applicationService.update(this.application.id, this.application)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.message = res.message ? res.message : 'This application was updated successfully!';
          this.showNotification('top', 'center');
          // Redirect to another page or perform other actions
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: (e) => console.error(e)
      });

  }

  diariseApplication() {
    this.application.approved = this.reason;
    this.application.status = this.status;
    this.applicationService.update(this.application.id, this.application)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.message = res.message ? res.message : 'This application was updated successfully!';
          this.showNotification2('top', 'center');
         // Redirect to another page or perform other actions
         this.router.navigate(['/dashboard']);
        },
        error: (e) => console.error(e)
      });
  }
  showNotification2(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span><b>Application Diarised.</b></span>',
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

  showNotification(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span><b>Application Sent To Institution Verification Queue.</b></span>',
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
