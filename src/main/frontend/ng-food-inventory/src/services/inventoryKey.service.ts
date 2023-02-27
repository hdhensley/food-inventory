import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Inventory } from "src/models/Inventory.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryKeyService {
    private $key: BehaviorSubject<string> = new BehaviorSubject<string>(environment.inventoryKey);
    private $allKeys: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());
    private _allKeys: Set<string> = new Set<string>();

    constructor(private http: HttpClient) {
        this.loadKey();
        this.getAllInventoryKeys();
    }

    public loadKey(): void {
        const savedKey = localStorage.getItem("inventoryKey") || environment.inventoryKey;
        this.$key.next(savedKey);
        this._allKeys.add(savedKey);
        this.$allKeys.next(this._allKeys);
    }

    public saveKey(): void {
        localStorage.setItem("inventoryKey", this.key);
    }

    public createInventory(inventoryKey: string): void {
        const sub = this.http.get<Inventory>('http://' + window.location.hostname + ':8080/api/inventory?key=' + inventoryKey);

        sub.subscribe({
            next: (inventory: Inventory) => {
                if(inventory.inventoryKey != undefined) {
                    this._allKeys.add(inventory.inventoryKey);
                }
            },
            error: (err) => console.error(err)
        });
    }

    public getAllInventoryKeys(): void {
        this.http.get<string[]>('http://' + window.location.hostname + ':8080/api/inventoryKey').subscribe({
            next: (keys: string[]) => {
                keys.forEach(key => this._allKeys.add(key));
                this.$allKeys.next(this._allKeys);
            },
            error: (err) => console.error(err)
        })
    }

    set key(_key: string) {
        this.$key.next(_key);
        this.saveKey();
    }

    get key(): string {
        return this.$key.value;
    }

    get allKeys(): Set<string> {
        return this._allKeys;
    }

    get keySub(): Observable<string> {
        return this.$key.asObservable();
    }

    get allKeySub(): Observable<Set<string>> {
        return this.$allKeys.asObservable();
    }
}
