import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../shared-service/loader.service';
import { PRIMENG_MODULES } from '../primeng-modules';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, PRIMENG_MODULES],
  template: `
    <div class="loader-overlay" *ngIf="loaderService.isLoading$ | async">
      <p-progressSpinner
        styleClass="custom-spinner"
        strokeWidth="4"
        animationDuration=".5s">
      </p-progressSpinner>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
