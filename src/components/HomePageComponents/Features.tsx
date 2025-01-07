import { Truck, Shield, RefreshCw, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30 days return policy"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support"
  }
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}