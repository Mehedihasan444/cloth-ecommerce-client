/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from '@/AuthProvider/Authprovider';
import { Categories } from '@/components/HomePageComponents/Categories';
import { Features } from '@/components/HomePageComponents/Features';
import { Instagram } from '@/components/HomePageComponents/Instagram';
import { Newsletter } from '@/components/HomePageComponents/Newsletter';
import { Testimonials } from '@/components/HomePageComponents/Testimonials';
import { Trending } from '@/components/HomePageComponents/Trending';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useContext } from 'react';
import { toast } from 'sonner';


const products = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential cotton t-shirt in crisp white',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Dark wash denim with perfect stretch',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format',
  },
  {
    id: '3',
    name: 'Wool Blend Coat',
    description: 'Elegant winter coat in charcoal grey',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format',
  },
  {
    id: '4',
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse in soft pink',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=500&auto=format',
  },
];

export default function Home() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const axiosPublic = useAxiosPublic();
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
      <section className="mb-16">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Summer Collection 2024</h1>
              <p className="text-xl mb-8">Discover the latest trends in fashion</p>
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Features />
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                <CardDescription className="mt-2">
                  {product.description}
                </CardDescription>
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
      </section>


      <Categories />
      <Trending />
      <Testimonials />
      <Newsletter />
      <Instagram />
    </div>
  );
}