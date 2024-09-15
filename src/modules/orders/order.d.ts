interface IProduct {
  id: string;
  quantity: number;
  price: number;
}

interface ICreateOrderRequest {
  customer_id: number;
  products: IProduct[];
  totalValue: number;
}
