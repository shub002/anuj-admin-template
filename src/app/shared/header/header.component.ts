import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { PRIMENG_MODULES } from '../primeng-modules';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, PRIMENG_MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ConfirmationService]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  openLogoutDialog() {
    this.confirmationService.confirm({
      message: 'Do you really want to log out?',
      header: 'Logout Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.logout();
      },
      reject: () => {
        console.log('Logout cancelled');
      }
    });
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
