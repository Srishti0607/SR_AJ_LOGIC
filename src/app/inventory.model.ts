export class InventoryClass {
    private libraryName: string;
    private address: string;
    private librarianName: string;
    private books: any;
  
    constructor(libraryName: string, address: string, librarianName, books: any) {
      this.libraryName = libraryName;
      this.address = address;
      this.librarianName = librarianName;
      this.books = books;
    }
  
    getName(): string {
      return this.libraryName;
    }
  
    getAddress(): string {
      return this.address;
    }

    getLibrarianName():string{
        return this.librarianName
    }

    getBooks():any{
        return this.books
    }
  }