interface Item {
  id: string;
  name: string;
}

interface Book extends Item {
  author: string;
  pages: number;
}

interface Device extends Item {
  brand: string;
  hasWarranty: boolean;
}

interface Clothes extends Item {
  size: string;
  material: string;
}

class Store<T extends Item> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
  }

  removeItem(id: string): T | undefined {
    const item = this.findItem(id);
    if (item) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }
    return item;
  }

  //   findItem(id: string): T | undefined {
  //     return this.items.find((item) => item.id === id);
  //   }

  findItem(id: string): T | undefined {
    for (const item of this.items) {
      if (item.id === id) {
        return item;
      }
    }
    return undefined;
  }

  getItems(): T[] {
    return this.items;
  }
}

const bookStore = new Store<Book>();
const deviceStore = new Store<Device>();
const clothesStore = new Store<Clothes>();

// Add books to the store
bookStore.addItem({
  id: "b1",
  name: "Harry Potter",
  author: "J.K. Rowling",
  pages: 500,
});
bookStore.addItem({
  id: "b2",
  name: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 310,
});
bookStore.addItem({
  id: "b3",
  name: "Percy Jackson",
  author: "Rick Riordan",
  pages: 350,
});

// Add devices to the store
deviceStore.addItem({
  id: "d1",
  name: "Phone",
  brand: "Samsung",
  hasWarranty: true,
});
deviceStore.addItem({
  id: "d2",
  name: "Laptop",
  brand: "HP",
  hasWarranty: true,
});
deviceStore.addItem({
  id: "d3",
  name: "Earbuds",
  brand: "Boat",
  hasWarranty: false,
});

// Add clothes to the store
clothesStore.addItem({
  id: "c1",
  name: "Shirt",
  size: "M",
  material: "Cotton",
});
clothesStore.addItem({ id: "c2", name: "Pants", size: "L", material: "Denim" });
clothesStore.addItem({
  id: "c3",
  name: "Jacket",
  size: "S",
  material: "Leather",
});

// 1. Get all items in each store
console.log("Books in Store:", bookStore.getItems());
console.log("Devices in Store:", deviceStore.getItems());
console.log("Clothes in Store:", clothesStore.getItems());

// 2. Find an item by ID
const foundBook = bookStore.findItem("b2");
console.log("Found Book:", foundBook);

const foundDevice = deviceStore.findItem("d1");
console.log("Found Device:", foundDevice);

const foundClothes = clothesStore.findItem("c3");
console.log("Found Clothes:", foundClothes);

// 3. Remove an item by ID
const removedBook = bookStore.removeItem("b1");
console.log("Removed Book:", removedBook);

const removedDevice = deviceStore.removeItem("d2");
console.log("Removed Device:", removedDevice);

const removedClothes = clothesStore.removeItem("c1");
console.log("Removed Clothes:", removedClothes);

// 4. Get the updated list of items after removal
console.log("Updated Books in Store:", bookStore.getItems());
console.log("Updated Devices in Store:", deviceStore.getItems());
console.log("Updated Clothes in Store:", clothesStore.getItems());
