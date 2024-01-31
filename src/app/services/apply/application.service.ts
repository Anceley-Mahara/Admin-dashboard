import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../models/apply/application';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(baseUrl + '/list');
  }

   // Function to get file data
   getFile(applicationId: number, fieldName: string): Observable<Blob> {
    const url = `${baseUrl}/${fieldName}/${applicationId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  viewFile(applicationId: number, fieldName: string): Observable<any> {
    const url = `${baseUrl}/${fieldName}/${applicationId}`;

    // Set headers as needed, for example, to accept binary data
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });

    return this.http.get(url, { headers, responseType: 'arraybuffer' });
  }
  getFiles(applicationId: number, fieldName: string): Observable<Blob> {
    // Use the HttpClient to make the request and return the observable
    return this.http.get(`${baseUrl}/${applicationId}/file/${fieldName}`, { responseType: 'blob' });
  }
  downloadFile(applicationId: number, fieldName: string): void {
    this.viewFile(applicationId, fieldName).subscribe(
      (data: any) => {
        // Create a Blob from the array buffer received
        const blob = new Blob([data], { type: 'application/pdf' });

        // Create a data URL for the Blob
        const blobUrl = URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${fieldName}.pdf`;

        // Append the anchor element to the document
        document.body.appendChild(link);

        // Trigger the click event to start the download
        link.click();

        // Remove the anchor element from the document
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error downloading file', error);
        // Handle the error as needed
      }
    );
  }
  getApplication(Id: any): Observable<Application> {
    return this.http.get<Application>(`${baseUrl}/application/${Id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByPassportNumber(passportNumber: any): Observable<Application[]> {
    return this.http.get<Application[]>(`${baseUrl}?passportNumber=${passportNumber}`);
  }
}
