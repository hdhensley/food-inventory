import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InventoryKeyService} from 'src/services/inventoryKey.service';

@Component({
  selector: 'app-add-inventory-modal',
  templateUrl: './add-inventory-modal.component.html'
})
export class AddInventoryModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  newInventoryForm: FormGroup|undefined;
  error: string = "";

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private inventoryKeyService: InventoryKeyService
  ){}

  ngOnInit(): void {
    this.newInventoryForm = this.fb.group({
      newInventory: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  saveInventoryKey({ value, valid }: { value: any, valid: boolean }) {
    if(!valid) {
      this.error = "Please enter an inventory name to create";
      return;
    }

    this.error = "";

    this.inventoryKeyService.createInventory(value.newInventory);

    this.cancel();
  }

  cancel() {
    this.newInventoryForm?.reset();
    this.error = "";
    this.closeModal.emit(true);
  }
}