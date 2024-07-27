interface IProductRequest {
  name: string;
  price: number;
  quantity: number;
}

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
};
