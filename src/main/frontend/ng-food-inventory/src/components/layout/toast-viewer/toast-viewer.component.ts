import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastService} from "../../../services/toast.service";

@Component({
    selector: 'app-toast-viewer',
    imports: [CommonModule],
    template: `
    <div class="toast toast-top toast-end mt-14">
      <div *ngFor="let messageID of toastService.messages.keys()"
          class="alert alert-{{toastService.messages.get(messageID)?.type}}">
        {{toastService.messages.get(messageID)?.body}}
      </div>
    </div>
  `
})
export class ToastViewerComponent {
  toastService = inject(ToastService);
}
