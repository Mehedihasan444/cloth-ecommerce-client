import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/AuthProvider/Authprovider';
import { toast } from 'sonner';
import SocialLogin from '@/components/Social_Login/SocialLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const signIn_with_email = auth?.signIn_with_email;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    setIsLoading(true);
    try {
      if (!signIn_with_email) {
        throw new Error('Authentication method not available');
      }
      const res = await signIn_with_email(email, password)
      console.log(res)
      if (res.user) {
        toast.success("Login Successful!!!");
        navigate("/");
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="max-w-md mx-auto border p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
            placeholder='Enter your password'
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? 'Loading...' : 'Login'}

          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
}