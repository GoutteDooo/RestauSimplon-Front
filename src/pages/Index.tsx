import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Star,
      title: "5-Star Experience",
      description: "Consistently rated as one of the city's top dining destinations"
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "All ingredients sourced daily from local farms and markets"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized by culinary experts and food critics worldwide"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish crafted with passion and attention to detail"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose RestauSimplon?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering an extraordinary culinary experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-gradient-card shadow-elegant hover:shadow-warm transition-all group animate-slide-up">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Experience RestauSimplon?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Browse our menu or make a reservation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button variant="primary" size="lg">
                View Menu
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="elegant" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
