/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/Authprovider';
import { toast } from 'sonner';
import useAxiosPublic from '@/hooks/useAxiosPublic';

import ProductCard from '@/components/ProductCard';
import { TProduct } from '@/Interface';

// const products = [
//   {
//     _id: '1',
//     name: 'Classic White T-Shirt',
//     description: 'Essential cotton t-shirt in crisp white',
//     price: 29.99,
//     rating: 4,
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
//     category: 'tops',
//   },
//   {
//     _id: '2',
//     name: 'Slim Fit Jeans',
//     description: 'Dark wash denim with perfect stretch',
//     price: 79.99,
//     rating: 3,
//     image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format',
//     category: 'bottoms',
//   },
//   {
//     _id: '3',
//     name: 'Wool Blend Coat',
//     description: 'Elegant winter coat in charcoal grey',
//     price: 199.99,
//     rating: 5,
//     image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format',
//     category: 'outerwear',
//   },
//   {
//     _id: '4',
//     name: 'Silk Blouse',
//     description: 'Luxurious silk blouse in soft pink',
//     price: 89.99,
//     rating: 4,
//     image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=500&auto=format',
//     category: 'tops',
//   },
//   {
//     _id: '5',
//     name: 'Leather Jacket',
//     description: 'Classic black leather motorcycle jacket',
//     price: 299.99,
//     rating: 4.5,
//     image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format',
//     category: 'outerwear',
//   },
//   {
//     _id: '6',
//     name: 'Pleated Skirt',
//     description: 'Elegant pleated midi skirt',
//     price: 69.99,
//     rating: 4,
//     image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&auto=format',
//     category: 'bottoms',
//   },
// ];

export default function Shop() {
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('featured');
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const axiosPublic = useAxiosPublic();
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const categoryParam = queryParams.get('category');

useEffect(() => {
  if (categoryParam) setCategory(categoryParam);
}, [categoryParam]);

  useEffect(() => {
    try {
      const getProducts = async () => {
        if (categoryParam){
          const res = await axiosPublic.get(`/admin/products?category=${categoryParam}`);
          console.log(res.data)
          setProducts(res.data)
        }else{

          const res = await axiosPublic.get('/admin/products');
          console.log(res.data)
          setProducts(res.data)
        }
      }
      if (!products) {

        getProducts();
      }
    } catch (error) {
      console.log(error)

    }
  }, [axiosPublic, products,categoryParam])

  const filteredProducts = products
    ?.filter((product) => category === 'all' || product.category === category)
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
              <SelectItem value="Basic Joggers">Basic Joggers</SelectItem>
              <SelectItem value="Polo T-shirt">Polo T-shirt</SelectItem>
              <SelectItem value="Narrow Pants">Narrow Pants</SelectItem>
              <SelectItem value="Hoodies">Hoodies</SelectItem>
              <SelectItem value="Cargo Pants">Cargo Pants</SelectItem>
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
        {filteredProducts?.map((product) => (
          <ProductCard key={product._id} product={product} handleCart={handleCart} />
        ))}
      </div>
    </div>
  );
}