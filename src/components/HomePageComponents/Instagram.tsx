import { InstagramIcon } from 'lucide-react';

const instagramPosts = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&auto=format",
  "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&auto=format",
];

export function Instagram() {
  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-12">
          <InstagramIcon className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Follow Us on Instagram</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((image, index) => (
            <div key={index} className="relative group overflow-hidden">
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}