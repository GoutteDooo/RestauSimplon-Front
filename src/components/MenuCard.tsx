import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

const MenuCard = ({ item }: { item: MenuItemProps }) => {
  return (
    <Card className="overflow-hidden hover:shadow-warm transition-all duration-300 group bg-gradient-card">
      {/* Image placeholder - you can replace with actual images */}
      <div className="aspect-video bg-gradient-to-br from-accent to-golden relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/20 to-transparent" />
        <div className="absolute bottom-4 right-4">
          {item.isVegetarian && (
            <Badge variant="secondary" className="mr-2">
              Vegetarian
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="destructive">
              Spicy
            </Badge>
          )}
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {item.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {item.category}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-golden fill-golden" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-foreground/80 line-clamp-2">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">
          ${item.price.toFixed(2)}
        </span>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;