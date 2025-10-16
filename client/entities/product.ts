export interface Product {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  mainImage?: string;
  images?: string[];
}
