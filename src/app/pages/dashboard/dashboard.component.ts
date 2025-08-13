import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  userDialog: boolean = false;
  submitted: boolean = false;
  user: User = { name: '', email: '', role: '' };
  isEditMode: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  openNew() {
    this.user = { name: '', email: '', role: '' };
    this.submitted = false;
    this.userDialog = true;
    this.isEditMode = false;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
    this.isEditMode = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: `${user.name} removed` });
      }
    });
  }

  saveUser() {
    this.submitted = true;
    if (this.user.name.trim() && this.user.email.trim() && this.user.role.trim()) {
      if (this.isEditMode) {
        this.users[this.findIndexById(this.user.id!)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated' });
      } else {
        this.user.id = this.createId();
        this.users.push(this.user);
        this.messageService.add({ severity: 'success', summary: 'Created', detail: 'User added' });
      }
      this.userDialog = false;
      this.user = { name: '', email: '', role: '' };
    }
  }

  findIndexById(id: number): number {
    return this.users.findIndex(u => u.id === id);
  }

  createId(): number {
    return Math.max(...this.users.map(u => u.id || 0), 0) + 1;
  }
}
