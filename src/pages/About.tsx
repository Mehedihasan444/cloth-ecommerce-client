import { Building2, Users2, Award, Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function About() {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About StyleStore</h1>
          <p className="text-lg text-muted-foreground">
            We're passionate about bringing you the latest fashion trends while maintaining 
            our commitment to quality, sustainability, and exceptional customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format"
            alt="Our Story"
            className="rounded-lg object-cover h-[400px]"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, StyleStore began with a simple mission: to make quality fashion 
              accessible to everyone. What started as a small boutique has grown into a 
              beloved fashion destination, thanks to our dedicated team and loyal customers.
            </p>
            <p className="text-muted-foreground">
              We carefully curate our collections to bring you the perfect blend of timeless 
              classics and contemporary trends, ensuring that every piece meets our high 
              standards of quality and style.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Building2,
              title: "Quality First",
              description: "Premium materials and expert craftsmanship in every piece"
            },
            {
              icon: Users2,
              title: "Customer Focus",
              description: "Dedicated to providing exceptional shopping experiences"
            },
            {
              icon: Award,
              title: "Style & Comfort",
              description: "Perfect blend of fashion-forward design and comfort"
            },
            {
              icon: Leaf,
              title: "Sustainability",
              description: "Committed to ethical and sustainable fashion practices"
            }
          ].map((value) => (
            <Card key={value.title} className="p-6">
              <value.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're constantly evolving and growing, always looking for new ways to serve our 
            community better. Thank you for being part of our story.
          </p>
        </div>
      </div>
    </main>
  );
}