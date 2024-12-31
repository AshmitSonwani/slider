import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  style: React.CSSProperties;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  style,
  isHovered,
  onHover,
  onAddToCart,
}) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out"
      style={style}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className={`
          relative group 
          ${isHovered ? 'scale-125 shadow-2xl' : ''} 
          transition-all duration-700 ease-out
        `}
      >
        <div className="
          w-[200px] h-[200px] 
          rounded-full overflow-hidden 
          ring-4 ring-transparent 
          group-hover:ring-white/30 
          transition-all duration-500
          shadow-lg
        ">
          <img
            src={`${product.image}?auto=format&fit=crop&w=400&h=400`}
            alt={product.name}
            className="
              w-full h-full 
              object-cover 
              transform transition-transform 
              duration-700 ease-out
              group-hover:scale-110
            "
          />
        </div>
        
        <div className={`
          absolute inset-0 
          rounded-full 
          bg-black/75 
          flex flex-col items-center justify-center 
          p-4 text-white 
          opacity-0
          backdrop-blur-sm
          transition-all duration-500 ease-out
          ${isHovered ? 'opacity-100' : ''}
        `}>
          <h3 className="text-lg font-bold mb-1 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            {product.name}
          </h3>
          <p className="text-sm mb-2 transform translate-y-2 transition-transform duration-500 delay-75 group-hover:translate-y-0">
            ${product.price}
          </p>
          <p className="text-xs mb-3 text-center transform translate-y-2 transition-transform duration-500 delay-100 group-hover:translate-y-0">
            {product.description}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            className="
              bg-white text-black 
              px-4 py-2 
              rounded-full 
              flex items-center gap-2 
              transform translate-y-2 
              transition-all duration-500 delay-150
              hover:bg-gray-200 hover:scale-105 
              active:scale-95
              group-hover:translate-y-0
            "
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};