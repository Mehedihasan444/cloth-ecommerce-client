export interface TProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount:number,
    rating: number;
    image: string;
    category: string;
}

export interface TOrder {
    _id: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    total_bill: number;
    phone: string;
    ordered_date: string;
    userEmail: string;
    status: string;
    payment: string;
    transactionId: string;
    products:TProduct[];
    code: string;
  }