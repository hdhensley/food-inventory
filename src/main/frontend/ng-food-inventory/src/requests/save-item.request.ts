import { Item } from "src/models/item.model";

export class SaveItemRequest {
    id: string | undefined;
    locationId: number | undefined;
    brand: string | undefined;
    name: string | undefined;
    quantity: number | undefined;
    removedDate: string | null;
    deletedDate: string | null;

    constructor(item: Item) {
        this.id = item.id;
        this.locationId = item.location?.id;
        this.brand = item.brand;
        this.name = item.name;
        this.quantity = item.quantity;
        this.removedDate = item.removedDate;
        this.deletedDate = item.deletedDate;
    }
}