import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InventoryService} from "../../services";
import {Item} from "../../models/item.model";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
})
export class EditItemComponent implements OnInit {
  item: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ){}

  ngOnInit(): void {
    this.item = this.inventoryService.getItem(this.route.snapshot.paramMap.get('itemId'));
    if(!this.item){
      console.error("THE ITEM WAS NOT FOUND");
    }
  }
}
