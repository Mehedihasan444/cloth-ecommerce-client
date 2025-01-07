import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trendingItems = [
  {
    title: "Summer Essentials",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format",
    category: "Collection",
    tag: "Trending"
  },
  {
    title: "Sustainable Fashion",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format",
    category: "Eco-Friendly",
    tag: "New"
  }
];

export function Trending() {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {trendingItems.map((item) => (
            <Card key={item.title} className="group cursor-pointer overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                  <Badge className="w-fit mb-2">{item.tag}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}