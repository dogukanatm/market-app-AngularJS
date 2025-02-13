export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface Urun {
  id: number;
  ad: string;
  fiyat: number;
  aciklama: string;
  resimUrl: string;
  kategori: string;
  stok?: number;
} 