import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-toast-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-viewer.component.html'
})
export class ToastViewerComponent {
  constructor(public toastService: ToastService) {}
}
