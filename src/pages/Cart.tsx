import { AuthContext } from '@/AuthProvider/Authprovider';
import { Button } from '@/components/ui/button';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface TCart {
  _id: string;
  name: string;
  image: string;
  price: number;
  email: string;
  quantity: number;
}
export default function Cart() {
  const navigate = useNavigate();


  const [cartItems, setCartItems] = useState<TCart[]>([]);
  const authContext = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const user = authContext ? authContext.user : null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.email) {
        console.error('User email is not available');
        return;
      }
      try {
        const res = await axiosPublic.get(`/cart/${user?.email}`);
        console.log(res.data);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCartItems([]);
      }
    };

    fetchAppointments();
  }, [user?.email, axiosPublic]);


  // const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const shipping = 5.99;
  // // const tax = subtotal * 0.08;



  const removeItem = async (id: string) => {
    try {
      await axiosPublic.delete(`/cart/${id}`);
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await axiosPublic.patch(`/cart/${id}`, { quantity });
      const updatedCart = cartItems.map((item) => {
        if (item._id === id) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    toast.success('Order placed successfully!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button onClick={() => navigate('/shop')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">Size: {item.quantity}</p>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeItem(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}