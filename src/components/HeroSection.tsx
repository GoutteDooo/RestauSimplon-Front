import { Button } from "@/components/ui/button";
import { ChefHat, Star } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-warm-brown/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <ChefHat className="w-12 h-12 text-golden mr-4 animate-float" />
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-golden fill-golden" />
            ))}
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-gradient-hero bg-clip-text">
            RestauSimplon
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience culinary excellence where every dish tells a story of passion, 
          tradition, and innovation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="animate-slide-up">
            Explore Menu
          </Button>
          <Button variant="outline" size="lg" className="animate-slide-up text-cream border-cream hover:bg-cream hover:text-warm-brown">
            Reserve Table
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;