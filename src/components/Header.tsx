
import { LayoutDashboard, LogIn, LogOut, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/Authprovider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const user = authContext ? authContext?.user : null;
    const logOut = authContext ? authContext.logOut : null;
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user?.email) {
                console.error('User email is not available');
                return;
            }
            try {
                const res = await axiosPublic.get(`/cart/${user?.email}`);
          
                setCartItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCartItems([]);
            }
        };
        if (user?.email && cartItems.length === 0) {
            fetchAppointments();

        }
    }, [user?.email, axiosPublic, cartItems]);

    // handle logout
    const handleLogout = async () => {
        if (logOut) {
            await logOut();
            navigate('/');
        }
    }
    return (
        <div>
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">TRIO MARK CLOTHING</Link>
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
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                        {cartItems?.length}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        {user ? <Link to=''>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className=''>
                                        <AvatarImage src={user?.image} />
                                        <AvatarFallback>{user?.name}</AvatarFallback>
                                    </Avatar></DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => window.location.assign("/dashboard/profile")} className='cursor-pointer'>
                                        <User className="h-5 w-5 mr-2" /> Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() =>  window.location.assign(`${user?.role === "user" ? "/dashboard" : "/admin"}`)}>
                                        <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => handleLogout()}>
                                        <LogOut className="h-5 w-5 mr-2" /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Link> :

                            <Button variant='secondary' className='border-primary border-2 text-primary hover:border-primary ' onClick={() => navigate("/login")} >
                                <LogIn className="h-5 w-5 mr-2" />Login</Button>
                        }

                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;