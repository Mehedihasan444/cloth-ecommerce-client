import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4 text-center text-primary-foreground">
        <Mail className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8 max-w-md mx-auto">Get exclusive offers, new arrival alerts, and 10% off your first order.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-primary-foreground text-primary"
          />
          <Button variant="secondary">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}