import { Location } from '../models/location.model';

export class SaveLocationRequest {
    name: string | undefined;
    inventoryId: number | undefined;
    parent?: Location | null | undefined;

    constructor(location: Location) {
        this.name = location.name;
        this.inventoryId = location.inventory_id;
        this.parent = location.parent;
    }
}