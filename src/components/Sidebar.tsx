import { useContext } from 'react';
import {
  Home,
  PawPrint,
  Stethoscope,
  Pill,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  LucideIcon
} from 'lucide-react';
import { AuthContext } from '../AuthProvider/Authprovider';
import { Link, useNavigate } from 'react-router-dom';

import { useMemo, useCallback } from 'react';
interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}


const ADMIN_MENU: MenuItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard/admin' },
  { icon: PawPrint, label: 'Users', href: '/dashboard/admin/users' },
  { icon: Stethoscope, label: 'Consultations', href: '/dashboard/admin/consultations' },
  { icon: Pill, label: 'Medicine', href: '/dashboard/admin/medicine' },
  { icon: ShoppingBag, label: 'Pet Supplies', href: '/dashboard/admin/supplies' },
  { icon: Heart, label: 'Adoptions', href: '/dashboard/admin/adoptions' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/admin/payments' },
  // { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' }
];

const USER_MENU: MenuItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: PawPrint, label: 'My Pets', href: '/dashboard/pets' },
  { icon: Stethoscope, label: 'Book Consultation', href: '/dashboard/book' },
  { icon: ShoppingBag, label: 'Orders', href: '/dashboard/shop' },
  { icon: Heart, label: 'Adopt', href: '/dashboard/adopt' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
];

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const logOut = authContext?.logOut;
  const user = authContext?.user;
  const navigate = useNavigate();
  const menuItems = useMemo(() => {
    if (user?.role === 'admin') return ADMIN_MENU;
    if (user?.role === 'user') return USER_MENU;
    return [];
  }, [user?.role]);

  const handleLogout = useCallback(async () => {
    if (logOut) {
      await logOut();
      navigate('/');
    }
  }, [logOut, navigate]);
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 ">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-indigo-600">PawCare</Link>
          {/* <h1 className="text-xl font-bold text-indigo-600">PawCare</h1> */}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => handleLogout()}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}