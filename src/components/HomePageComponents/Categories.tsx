import { Button } from '@/components/ui/button';

const categories = [
  {
    name: "Basic Joggers",
    image: "https://i.ibb.co.com/sy9MhJ9/image.png",
  },
  {
    name: "Polo T-shirt",
    image: "https://i.ibb.co.com/By3R9Z2/image.png",
  },
  {
    name: "Narrow Pants",
    image: "https://i.ibb.co.com/4R545ny/image.png",
  },
  {
    name: "Cargo Pants",
    image: "https://i.ibb.co.com/FVnxWnw/image.png",
  },
  {
    name: "Hoodies",
    image: "https://i.ibb.co.com/vvXqy3C/IMG-0847.jpg",
  },
  {
    name: " Full Sleeve",
    image: "https://i.ibb.co.com/hFxWcYS/IMG-0867.jpg",
  },

];




export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="relative group overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button variant="outline" onClick={()=>window.location.assign(`/shop?category=${category.name}`)} className=" border-white hover:bg-white hover:text-black">
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