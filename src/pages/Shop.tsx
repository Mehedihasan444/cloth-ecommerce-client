/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContext, useState } from 'react';
import { AuthContext } from '@/AuthProvider/Authprovider';
import { toast } from 'sonner';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Star } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential cotton t-shirt in crisp white',
    price: 29.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
    category: 'tops',
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Dark wash denim with perfect stretch',
    price: 79.99,
    rating: 3,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format',
    category: 'bottoms',
  },
  {
    id: '3',
    name: 'Wool Blend Coat',
    description: 'Elegant winter coat in charcoal grey',
    price: 199.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format',
    category: 'outerwear',
  },
  {
    id: '4',
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse in soft pink',
    price: 89.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=500&auto=format',
    category: 'tops',
  },
  {
    id: '5',
    name: 'Leather Jacket',
    description: 'Classic black leather motorcycle jacket',
    price: 299.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format',
    category: 'outerwear',
  },
  {
    id: '6',
    name: 'Pleated Skirt',
    description: 'Elegant pleated midi skirt',
    price: 69.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&auto=format',
    category: 'bottoms',
  },
];

export default function Shop() {
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('featured');
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const axiosPublic = useAxiosPublic();
  const filteredProducts = products
    .filter((product) => category === 'all' || product.category === category)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });
  const handleCart = async (product: any) => {
    if (!user) {
      toast.warning('Please login to add to cart');
      window.location.assign('/login');
      return;

    }
    try {
      const res = await axiosPublic.post('/cart', { ...product, email: user.email, quantity: 1 });
      console.log(res.data)
      if (res.data.insertedId)
        toast.success('Product added to cart');
      if (res.data.message === 'already exists') {
        toast.warning('product already exist in your cart');

      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to add to cart');
    }

  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Shop</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="my-2">
                {product.description}
              </CardDescription>
              <div className="flex items-center ">
                {[...Array(Math.round(product?.rating))]?.map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() =>
                  handleCart(product)
                  // addItem({
                  //   id: product.id,
                  //   name: product.name,
                  //   price: product.price,
                  //   image: product.image,
                  //   quantity: 1,
                  //   size: 'M',
                  // })
                }
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}