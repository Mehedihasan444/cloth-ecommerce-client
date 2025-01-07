
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/Authprovider';
import useAxiosPublic from '@/hooks/useAxiosPublic';

interface TCart {
    _id: string;
    name: string;
    image: string;
    price: number;
    email: string;
    quantity: number;
}
const Header = () => {
    const [cartItems, setCartItems] = useState<TCart[]>([]);
    const auth = useContext(AuthContext);
    const user = auth?.user;
    const logOut = auth?.logOut;
    const axiosPublic = useAxiosPublic();
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

    return (
        <div>
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">LUXE</Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/shop" className="text-sm hover:text-primary">Shop</Link>
                        <Link to="/about" className="text-sm hover:text-primary">About</Link>
                        <Link to="/contact" className="text-sm hover:text-primary">Contact</Link>
                        <Link to="/faq" className="text-sm hover:text-primary">FAQ</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <Link to="/cart">
                            <Button variant="outline" className='relative '>
                                <ShoppingCart className="h-5 w-5 " />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {user ? (
                            <Button variant="outline" onClick={logOut}>Logout</Button>
                        ) : (
                            <Link to="/login">
                                <Button variant="outline" >
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;