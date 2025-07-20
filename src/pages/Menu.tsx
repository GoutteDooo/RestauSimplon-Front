import { useState } from "react";
import MenuCard from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock data - in a real app, this would come from your database
const menuItems = [
  {
    id: "1",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
    price: 28.99,
    category: "Main Course",
    rating: 4.8,
    isVegetarian: false,
    isSpicy: false
  },
  {
    id: "2",
    name: "Truffle Risotto",
    description: "Creamy arborio rice with black truffle and parmesan cheese",
    price: 24.99,
    category: "Main Course",
    rating: 4.9,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "3",
    name: "Spicy Shrimp Pasta",
    description: "Linguine with spicy shrimp in a rich tomato and garlic sauce",
    price: 22.99,
    category: "Main Course",
    rating: 4.6,
    isVegetarian: false,
    isSpicy: true
  },
  {
    id: "4",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with classic Caesar dressing and croutons",
    price: 14.99,
    category: "Appetizer",
    rating: 4.5,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 12.99,
    category: "Dessert",
    rating: 4.9,
    isVegetarian: true,
    isSpicy: false
  },
  {
    id: "6",
    name: "Beef Tenderloin",
    description: "Prime beef tenderloin cooked to your preference with seasonal vegetables",
    price: 35.99,
    category: "Main Course",
    rating: 4.8,
    isVegetarian: false,
    isSpicy: false
  }
];

const categories = ["All", "Appetizer", "Main Course", "Dessert"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No dishes found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;