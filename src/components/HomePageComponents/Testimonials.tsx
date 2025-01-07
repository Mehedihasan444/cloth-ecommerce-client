import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format",
    content: "The quality of their clothes is exceptional. Every piece I've purchased has become a wardrobe staple.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Professional Stylist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format",
    content: "As a stylist, I appreciate their attention to detail and trendsetting designs. My clients love their collections.",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format",
    content: "The shopping experience is seamless, and their customer service is outstanding. Highly recommended!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array(testimonial.rating).fill(null).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}