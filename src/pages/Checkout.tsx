import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/AuthProvider/Authprovider';
import AddressForm from '@/components/AddressForm';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
interface TCart {
    _id: string;
    name: string;
    image: string;
    price: number;
    email: string;
    quantity: number;
}
const CheckoutPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<TCart[]>([]);
    const authContext = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const user = authContext ? authContext.user : null;


    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user?.email) {
                console.error('User email is not available');
                return;
            }
            try {
                const res = await axiosPublic.get(`/cart/${user.email}`);
                console.log(res.data);
                setCartItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCartItems([]);
            }
        };

        fetchAppointments();
    }, [user?.email, axiosPublic]);


    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08;


    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">

                        <AddressForm user={user} cartItems={cartItems} total={subtotal + shipping + tax} />

                    </div>

                    <div>
                        <div className="">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    {...item}
                                />
                            ))}
                        </div>
                        <CartSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;