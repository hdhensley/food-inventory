import { Component, inject } from '@angular/core';

import { ToastService } from "../../../services/toast.service";

@Component({
    selector: 'app-toast-viewer',
    imports: [],
    template: `
    <div class="toast toast-top toast-end mt-14">
      @for (messageID of toastService.messages.keys(); track messageID) {
        <div
          class="alert alert-{{toastService.messages.get(messageID)?.type}}">
          {{toastService.messages.get(messageID)?.body}}
        </div>
      }
    </div>
    `
})
export class ToastViewerComponent {
  toastService = inject(ToastService);
}
