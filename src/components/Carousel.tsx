import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Vintage Camera",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Classic vintage camera with premium leather finish"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description: "Elegant minimalist watch with leather strap"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium wireless headphones with noise cancellation"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    description: "RGB mechanical keyboard with custom switches"
  },
  {
    id: 5,
    name: "Smart Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc",
    description: "Voice-controlled smart speaker with premium sound"
  },
  {
    id: 6,
    name: "Drone Camera",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
    description: "4K drone camera with stabilization"
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    description: "Ergonomic gaming mouse with RGB lighting"
  },
  {
    id: 8,
    name: "Tablet Pro",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "Professional tablet with stylus support"
  },
  {
    id: 9,
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Advanced smartwatch with health tracking"
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    description: "True wireless earbuds with premium sound"
  }
];

const Carousel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="relative w-[800px] h-[400px]">
        {products.map((product, index) => {
          const angle = (index * 360) / products.length + rotation;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 300;
          const z = Math.sin(radian) * 150;
          const scale = (z + 150) / 300;

          return (
            <div
              key={product.id}
              className="absolute left-1/2 top-1/2 transition-transform duration-300"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                zIndex: Math.floor(scale * 1000),
              }}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`relative group ${hoveredItem === product.id ? 'scale-110' : ''} transition-all duration-300`}>
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                  <img
                    src={`${product.image}?auto=format&fit=crop&w=400&h=400`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {hoveredItem === product.id && (
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-75 flex flex-col items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                    <p className="text-sm mb-2">${product.price}</p>
                    <p className="text-xs mb-3 text-center">{product.description}</p>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;