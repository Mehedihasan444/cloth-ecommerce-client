import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import AdminUsers from '@/pages/admin/Users';
import UserDashboard from '@/pages/user/Dashboard';
import UserOrders from '@/pages/user/Orders';
import UserProfile from '@/pages/user/Profile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from './AuthProvider/Authprovider';

function PrivateRoute({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== 'admin') return <Navigate to="/" />;

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/products" element={<PrivateRoute admin><AdminProducts /></PrivateRoute>} />
              <Route path="/admin/orders" element={<PrivateRoute admin><AdminOrders /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute admin><AdminUsers /></PrivateRoute>} />

              {/* User Routes */}
              <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><UserOrders /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            </Routes>
          </Layout>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;