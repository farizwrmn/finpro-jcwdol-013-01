// types.ts
interface Lead {
    source: string; // Facebook, Twitter, Search, etc.
    count: number;
  }
  
  interface NewVisitor {
    id: string; // Unique identifier (optional)
    country: string;
    active: boolean;
    downloads: number;
    sales: number;
    fromSearch: number;
    fromBookmarks: number;
  }
  
  interface Sale {
    id: string; // Unique identifier
    product: string;
    category: string;
    quantity: number;
    price: number;
    date: Date; // Or string depending on format
  }
  