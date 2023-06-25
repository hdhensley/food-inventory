import {Location} from './location.model';

export class Item {
  id = '';
  name = '';
  brand = '';
  quantity = 0;
  location: Location | undefined;
  dateAdded: Date = new Date();
  removedDate: string|null = null;
  deletedDate: string|null = null;
}

