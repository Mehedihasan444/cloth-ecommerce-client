/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from '@/AuthProvider/Authprovider';
import { Categories } from '@/components/HomePageComponents/Categories';
import { Features } from '@/components/HomePageComponents/Features';
import HeroSection from '@/components/HomePageComponents/HeroSection';
import { Instagram } from '@/components/HomePageComponents/Instagram';
import { Newsletter } from '@/components/HomePageComponents/Newsletter';
import { Testimonials } from '@/components/HomePageComponents/Testimonials';
import { Trending } from '@/components/HomePageComponents/Trending';
import ProductCard from '@/components/ProductCard';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { TProduct } from '@/Interface';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';


// const products = [
//   {
//     _id: '1',
//     name: 'Classic White T-Shirt',
//     description: 'Essential cotton t-shirt in crisp white',
//     price: 29.99,
//     rating: 4,
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
//   },
//   {
//     _id: '2',
//     name: 'Slim Fit Jeans',
//     description: 'Dark wash denim with perfect stretch',
//     price: 79.99,
//     rating: 3,
//     image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format',
//   },
//   {
//     _id: '3',
//     name: 'Wool Blend Coat',
//     description: 'Elegant winter coat in charcoal grey',
//     price: 199.99,
//     rating: 5,
//     image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format',
//   },
//   {
//     _id: '4',
//     name: 'Silk Blouse',
//     description: 'Luxurious silk blouse in soft pink',
//     price: 89.99,
//     rating: 4,
//     image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=500&auto=format',
//   },
// ];

export default function Home() {
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const axiosPublic = useAxiosPublic();


  useEffect(() => {
    try {
      const getProducts = async () => {
        const res = await axiosPublic.get('/admin/products');
        console.log(res.data)
        setProducts(res.data.sort(() => 0.5 - Math.random())
          .slice(0, 4))

      }
      if (!products) {

        getProducts();
      }
    } catch (error) {
      console.log(error)

    }
  }, [axiosPublic, products])

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
      <HeroSection />
      <Features />
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} handleCart={handleCart} />

          ))}
        </div>
      </section>


      <Categories />
      <Trending />
      <Testimonials />
      <Newsletter />
      <Instagram />
    </div>
  );
}