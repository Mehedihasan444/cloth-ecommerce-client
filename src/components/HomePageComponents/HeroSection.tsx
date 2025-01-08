import { Button } from "../ui/button";


const HeroSection = () => {
    return (
        <section className="mb-16">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Summer Collection 2024</h1>
                        <p className="text-xl mb-8">Discover the latest trends in fashion</p>
                        <Button size="lg" variant="secondary" onClick={() => window.location.assign('/shop')}>
                            Shop Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;