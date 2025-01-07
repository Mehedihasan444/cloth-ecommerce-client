import { Button } from '@/components/ui/button';

const categories = [
  {
    name: "Basic Joggers",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format",
  },
  {
    name: "Polo t Shirts",
    image: "https://images.unsplash.com/photo-1525845859779-54d477ff291f?w=600&auto=format",
  },
  {
    name: "Narrow Pants",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format",
  },
  {
    name: "Cargo Pants",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format",
  },

];

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="relative group overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button variant="outline" className=" border-white hover:bg-white hover:text-black">
                  {category.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}