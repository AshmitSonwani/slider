import React, { useState } from 'react';
import { products } from './productData';
import ProductCard from './ProductCard';
import { useCarouselAnimation } from './hooks/useCarouselAnimation';

const Carousel: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const rotation = useCarouselAnimation({ isPaused: hoveredItem !== null });

  const handleHover = (id: number | null) => {
    setHoveredItem(id);
  };

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center perspective-1000">
      <div className="relative w-[800px] h-[400px] preserve-3d">
        {products.map((product, index) => {
          const angle = (index * 360) / products.length + rotation;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 300;
          const z = Math.sin(radian) * 150;
          const scale = (z + 150) / 300;

          return (
            <ProductCard
              key={product.id}
              product={product}
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                zIndex: Math.floor(scale * 1000),
                opacity: scale * 0.8 + 0.2, // Fade out items in the back
              }}
              isHovered={hoveredItem === product.id}
              onHover={handleHover}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};