import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Dashboard from './components/Dashboard';
import CheckoutPage from './pages/Checkout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const auth = useContext(AuthContext)
  const user = auth?.user || null
  const loading = auth?.loading || null
  if (loading) {
    return <h1 className="text-4lx font-semibold">loading...</h1>;
  }
  if (user) {
    return <>
      {children}
    </>;
  }


  return <Navigate to="/login" state={location.pathname} replace></Navigate>
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/cart" element={<Layout> <Cart /></Layout>} />
            <Route path="/checkout" element={<Layout> <CheckoutPage /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute ><Dashboard /></PrivateRoute>}>
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<PrivateRoute ><AdminProducts /></PrivateRoute>} />
                <Route path="/admin/orders" element={<PrivateRoute ><AdminOrders /></PrivateRoute>} />
                <Route path="/admin/users" element={<PrivateRoute ><AdminUsers /></PrivateRoute>} />
              </>
            </Route>

            {/* User Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/orders" element={<PrivateRoute><UserOrders /></PrivateRoute>} />
              <Route path="/dashboard/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            </Route>
          </Routes>
          {/* </Layout> */}

          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;